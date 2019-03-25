// @flow
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import Cell from './cell'

const mockStore = {
    cells: {
        sqlCellId: {
            type: 'sql',
            query: 'select * from FACT_TRIP',
        },
        filterCellId: {
            type: 'filter',
            data: 'sqlId',
            operator: 'LESS_THAN',
            value: 100,
        },
        bigNumberCellId: {
            type: 'number',
            format: ',',
        },
        dashboardCellId: {
            type: 'dashboard',
            title: 'My Dashboard',
            cells: [{ id: 'bigNumberId', width: 400, height: 200 }],
        },
    },
}

const cellStore = createStore((state = mockStore, a) => {
    action('action')(a)
    return state
})

const stories = storiesOf('Cells', module)
    .add('loading', () => (
        <Provider store={cellStore}>
            <Cell id={'loadingCellId'} />
        </Provider>
    ))
    .add('sql', () => (
        <Provider store={cellStore}>
            <Cell id={'sqlCellId'} />
        </Provider>
    ))
