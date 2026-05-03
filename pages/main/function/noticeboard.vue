<script setup lang="ts">
interface Notice {
  idx: number;
  title: string;
  userId: string;
  createdAt: string;
  content: string;
}
const tableOptions = reactive<TableOptions<Notice>>({
  headers: [
    { title: '번호', key: 'idx', align: 'center', sortable: true },
    { title: '제목', key: 'title', align: 'center', sortable: true },
    { title: '작성자', key: 'userId', align: 'center', sortable: true },
    { title: '작성일', key: 'createdAt', align: 'center', sortable: true }
  ],
  sortBy: [],
  items: [],
  loading: true,
  page: 1,
  itemsPerPage: 10,
  search: '',
  searchs: {
    title: '',
    userId: ''
  },
  itemsLength: 0
});
// watch
// :search="tableOption.search" 로 바인딩 되어 있으므로
// 테이블 검색필터 입력을 실시간 감지하여 tableOption.search를 변화시켜
//  update:options를 실행하기 위해 watch 활용
watch(
  () => tableOptions.searchs.title,
  () => {
    tableOptions.search = String(Date.now());
  }
);
watch(
  () => tableOptions.searchs.userId,
  () => {
    tableOptions.search = String(Date.now());
  }
);
async function loadItems({ page, itemsPerPage, sortBy }: Pick<TableOptions<Notice>, 'page' | 'itemsPerPage' | 'sortBy'>): Promise<void> {
  tableOptions.loading = true;
  await getNoticeList();
}
async function getNoticeList(): Promise<Notice[]> {
  let url = `/api9/getNoticeList`;
  let params = {
    title: tableOptions.searchs.title,
    userId: tableOptions.searchs.userId
  };
  let result: Notice[] = [];
  let response;

  try {
    response = await RestfulService.GET<ResBaseDataApi<Notice[]>>(url, params);
  } catch (e) {
    utils.log('API 호출 오류:', e);
    return result;
  }

  if (!response || !response.recvData) {
    utils.log('응답 데이터가 없습니다.', response);
    return result;
  }

  if (!utils.isEmpty(response.recvData.code) && response.recvData.code === 200) {
    if (utils.isEmpty(response.recvData.data) || response.recvData.data.length <= 0) {
      utils.log('게시글 목록이 비어있습니다.');
    }

    tableOptions.items = response.recvData.data;
  }

  tableOptions.loading = false;
  return result;
}

// setup()
</script>

<template>
  <div>
    <v-data-table-server
      v-model:items-per-page="tableOptions.itemsPerPage"
      :headers="tableOptions.headers"
      :items="tableOptions.items"
      :items-length="tableOptions.itemsLength"
      :search="tableOptions.search"
      :loading="tableOptions.loading"
      item-value="idx"
      @update:options="loadItems"
    >
      <template v-slot:tfoot>
        <tr>
          <td>
            <v-text-field v-model="tableOptions.searchs.title" class="ma-2" density="compact" placeholder="제목" hide-details clearable></v-text-field>
          </td>
          <td>
            <v-text-field v-model="tableOptions.searchs.userId" class="ma-2" density="compact" placeholder="작성자" hide-details clearable></v-text-field>
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </div>
</template>

<style lang="scss" scope></style>
