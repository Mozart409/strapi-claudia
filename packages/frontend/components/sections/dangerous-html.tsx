import React, { Fragment, ReactElement, useEffect, useState } from "react"

interface Props {
  data: {
    [x: string]: any
    id: string
    html: string
  }
}

function DynamicRichText({ data }: Props): ReactElement {
  return (
    <div className="container mx-auto grid grid-cols-1 py-12 align-top lg:flex-row lg:flex-wrap">
      <div
        className="mx-auto"
        key={data.id}
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    </div>
  )
}

export default DynamicRichText
