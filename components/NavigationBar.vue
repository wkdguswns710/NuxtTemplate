<script setup lang="ts">
const layoutType = inject('layoutType') as string;

// Header
interface Menu {
  id: number;
  title: string;
  path: string;
  children?: Menu[];
}
const drawer = ref(false);
const mainMenuList: Menu[] = [
  {
    id: 1,
    title: 'Language',
    path: 'language',
    children: [
      { id: 2, title: 'HTML', path: 'html' },
      {
        id: 3,
        title: 'CSS',
        path: 'css',
        children: [
          { id: 4, title: 'CSS', path: 'css' },
          { id: 5, title: 'SCSS', path: 'scss' },
          { id: 6, title: 'TailwindCSS', path: 'tailwindcss' }
        ]
      },
      {
        id: 7,
        title: 'Script',
        path: 'script',
        children: [
          { id: 8, title: 'JavaScript', path: 'javascript' },
          { id: 9, title: 'TypeScript', path: 'typescript' }
        ]
      }
    ]
  },
  {
    id: 10,
    title: 'Project',
    path: 'project',
    children: [
      {
        id: 11,
        title: 'Framework',
        path: 'framework',
        children: [
          { id: 12, title: 'Nuxt', path: 'nuxt' },
          { id: 13, title: 'Test', path: 'test' }
        ]
      },
      {
        id: 14,
        title: 'VCS',
        path: 'vcs',
        children: [{ id: 15, title: 'Git', path: 'git' }]
      },
      {
        id: 16,
        title: 'Release',
        path: 'release',
        children: [{ id: 17, title: 'CI/CD', path: 'cicd' }]
      }
    ]
  },
  {
    id: 18,
    title: 'Function',
    path: 'function',
    children: [{ id: 19, title: 'NoticeBoard', path: 'noticeboard' }]
  }
];
function onMoveRoute(layoutPath: string | null, mainMenu: Menu | null, subMenu: Menu | null, childMenu: Menu | null): void {
  // utils.log(layoutPath, mainMenu, subMenu, childMenu);

  if (subMenu && subMenu.children && !childMenu) return;

  let path: string = `/${layoutPath}`;
  if (mainMenu && typeof mainMenu.path === 'string') path += `/${mainMenu.path}`;
  if (subMenu && typeof subMenu.path === 'string') path += `/${subMenu.path}`;
  if (childMenu && typeof childMenu.path === 'string') path += `/${childMenu.path}`;

  navigateTo({ path: path });
}

// Side
const search = shallowRef('');
const caseSensitive = shallowRef(false); // 대소문자 구분
function filter(value: string, search: string, item?: object): boolean {
  // value: Menu.title, search: 사용자의 입력값, item: Menu object
  // utils.log('filter : ' + value, search, item);
  return caseSensitive.value ? value.indexOf(search) > -1 : value.toLowerCase().indexOf(search.toLowerCase()) > -1;
}
function onActivated(val: unknown): void {
  // update:activated는 배열을 반환
  // val이 배열인지 검증
  const menuIdList = Array.isArray(val) ? (val as number[]) : [];
  if (menuIdList.length) onTreeItemClick(menuIdList[0]);
}
function onTreeItemClick(menuId: number): void {
  const result = findMenuPath(mainMenuList, menuId);

  if (result) {
    onMoveRoute(layoutType, result.mainMenu, result.subMenu, result.childMenu);
    drawer.value = false;
  }
}
function findMenuPath(
  menuList: Menu[],
  targetId: number,
  mainMenu: Menu | null = null,
  subMenu: Menu | null = null
): { mainMenu: Menu | null; subMenu: Menu | null; childMenu: Menu | null } | null {
  for (const menu of menuList) {
    // utils.log('################# findMenuPath : ', menuList, targetId, mainMenu, subMenu);
    // 현재 아이템이 타겟인 경우
    if (menu.id === targetId) {
      if (!mainMenu) {
        return { mainMenu: menu, subMenu: null, childMenu: null };
      } else if (!subMenu) {
        return { mainMenu, subMenu: menu, childMenu: null };
      } else {
        return { mainMenu, subMenu, childMenu: menu };
      }
    }

    // 자식이 있으면 재귀 탐색
    if (menu.children) {
      const newMainMenu = mainMenu || menu; // mainMenu가 있으면 그 값을 쓰고, 아니면 menu 사용
      const newSubMenu = mainMenu ? subMenu || menu : null;
      const result = findMenuPath(menu.children, targetId, newMainMenu, newSubMenu);
      if (result) return result;
    }
  }

  return null;
}
</script>

<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <img src="~/assets/imgs/nuxt-logo.svg" alt="Discover Nuxt" width="50px" @click="onMoveRoute(layoutType, null, null, null)" />

      <template v-if="$vuetify.display.xs">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      </template>
    </template>

    <template v-if="$vuetify.display.smAndUp">
      <v-app-bar-title @click="onMoveRoute(layoutType, null, null, null)"> NuxtTemplate </v-app-bar-title>

      <v-menu v-for="(mainMenu, index) in mainMenuList" :key="index" open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props">
            {{ mainMenu.title }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(subMenu, index) in mainMenu.children" :key="index" link>
            <v-list-item-title @click="onMoveRoute(layoutType, mainMenu, subMenu, null)">
              {{ subMenu.title }}
            </v-list-item-title>
            <template v-if="subMenu.children" v-slot:append>
              <v-icon icon="mdi-menu-right" size="x-small"></v-icon>
            </template>

            <v-menu activator="parent" open-on-hover submenu>
              <v-list>
                <v-list-item v-for="childMenu in subMenu.children" :key="index" link>
                  <v-list-item-title @click="onMoveRoute(layoutType, mainMenu, subMenu, childMenu)">
                    {{ childMenu.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-text-field v-model="search" label="Search Directory" variant="outlined" clearable hide-details style="padding: 15px 16px 0px"></v-text-field>

    <!-- <v-treeview :items="mainMenuList" item-value="id" :search="search" :custom-filter="filter"  open-on-click activatable @update:activated="(menus) => menus.length && onTreeItemClick(menus[0])"></v-treeview>> </v-treeview> -->
    <v-treeview
      :items="mainMenuList"
      item-value="id"
      :search="search"
      :custom-filter="filter"
      open-on-click
      activatable
      @update:activated="onActivated"
    ></v-treeview>
  </v-navigation-drawer>
</template>

<style lang="scss" scope>
.v-toolbar__content {
  .v-toolbar__prepend {
    margin: 0 4px;
    cursor: pointer;
  }

  .v-toolbar-title {
    margin: 0 30px 0 5px !important;
    flex: 0 0 auto;
    cursor: pointer;
  }
}
</style>
