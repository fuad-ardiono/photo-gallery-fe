/* eslint-disable */

import {onMounted, ref, watch} from "vue";
import { chunk } from "lodash";

export function fetchPhoto(lastPage) {
  const photoData = ref([])

  const callApi = async () => {
    const response = await fetch(`http://localhost:8000/api/picture?perPage=10&page=${lastPage.value}`, {
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
      photoData.value.push(obj)
    })
  }

  onMounted(async () => {
    await callApi()
  })

  watch(lastPage, callApi)

  return {
    photoData
  }
}
