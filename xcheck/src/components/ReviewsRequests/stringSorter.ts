import {CompareFn} from "antd/es/table/interface"


interface SortObject {
  status: string
  name: string
  task: string
}

export default function stringSorter<T>(field: keyof SortObject): CompareFn<never> {
  return (a: SortObject, b: SortObject) => {
    if (a == null && b == null) {
      return 0;
    }
    if (a == null) {
      return -1;
    }
    if (b == null) {
      return 1;
    }
    return a[field]
      .toLowerCase()
      .localeCompare(
        b[field]
          .toLowerCase(),
      )
  }
}
