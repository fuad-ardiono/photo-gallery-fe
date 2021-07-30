/* eslint-disable */

import {onMounted, ref, watch} from "vue";
import { chunk } from "lodash";

export function fetchAlbum(lastPage) {
  const albumData = ref([])

  const callApi = async () => {
    const response = await fetch(`http://localhost:8000/api/album?perPage=10&page=${lastPage.value}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
    })

    chunkData(await response.json())
  }

  const chunkData = (data) => {
    chunk(data.data, 5).map((obj) => {
      albumData.value.push(obj)
    })
  }

  onMounted(async () => {
    await callApi()
  })

  watch(lastPage, callApi)

  return {
    albumData
  }
}
