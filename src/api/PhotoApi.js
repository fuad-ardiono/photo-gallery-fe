/* eslint-disable */

import {onMounted, ref, watch} from "vue";
import { chunk } from "lodash";

export function fetchPhoto(lastPage, search = "") {
  const photoData = ref([])
  const photoDataSearch = ref([])

  const callApi = async () => {
    if (search.value === "") {
      if (lastPage.value === 1 && photoDataSearch.value.length > 0) {
        photoData.value = []
      }
      photoDataSearch.value = []

      const response = await fetch(`http://localhost:8000/api/picture?perPage=10&page=${lastPage.value}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
      })

      const chunkData = (data) => {
        chunk(data.data, 5).map((obj) => {
          photoData.value.push(obj)
        })
      }

      chunkData(await response.json())
    } else {
      const response = await fetch(`http://localhost:8000/api/picture?perPage=999999&page=1&title=${search.value}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
      })

      const chunkData = (data) => {
        chunk(data.data, 5).map((obj) => {
          photoDataSearch.value.push(obj)
        })
      }

      chunkData(await response.json())
    }
  }

  onMounted(async () => {
    await callApi()
  })

  watch(lastPage, callApi)
  watch(search, callApi)

  return {
    photoData,
    photoDataSearch
  }
}
