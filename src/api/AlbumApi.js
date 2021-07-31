/* eslint-disable */

import {onMounted, ref, watch} from "vue";
import {chunk, debounce} from "lodash";

export function fetchAlbum(lastPage, search = "", maxPage= false, chunked = true) {
  const albumData = ref([])
  const albumDataSearch = ref([])

  const callApi = async () => {
    if (search.value === "") {
      console.log("trigger")
      if (lastPage.value === 1 && albumDataSearch.value.length > 0) {
        albumData.value = []
      }
      albumDataSearch.value = []

      const response = await fetch(`http://localhost:8000/api/album?perPage=${maxPage === true ? 999999 : 10}&page=${lastPage.value}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
      })

      const chunkData = (data) => {
        chunk(data.data, 5).map((obj) => {
          albumData.value.push(obj)
        })
      }

      if (chunked) {
        chunkData(await response.json())
      } else {
        const resp = await response.json()

        albumData.value = resp.data
      }
    } else {
      const response = await fetch(`http://localhost:8000/api/album?perPage=999999&page=1&title=${search.value}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
      })

      const chunkData = (data) => {
        chunk(data.data, 5).map((obj) => {
          albumDataSearch.value.push(obj)
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
    albumData,
    albumDataSearch
  }
}
