import React from 'react'
import styled from 'styled-components'

import { component as Button } from '../button'
import inputNumberList from '../input-number-list'
import inputNumber from '../input-number'
import select from '../select'
import bigNumber from '../big-number'
import histogram from '../histogram'
import lineChart from '../line-chart'

// TODO add negative margins right
const PickerGridDiv = styled.div`
  button {
    padding: 0 1em;
    display: inline-block;
    margin-right: var(--spacing_0_5);
    margin-bottom: var(--spacing_0_5);
  }
`

// TODO make grid of these
// TODO filter down to only top-level cell types
const Cell = ({ onChange }) => (
  <PickerGridDiv>
    {[
      inputNumberList,
      inputNumber,
      select,
      bigNumber,
      histogram,
      lineChart,
    ].map(cell => (
      <Button onClick={() => onChange(cell.type)}>{cell.name}</Button>
    ))}
  </PickerGridDiv>
)

export default Cell
