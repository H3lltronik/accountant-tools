import { get, writable } from 'svelte/store';
import * as utils from './utils';
import { v4 as uuidv4 } from 'uuid';

export const STEPS = {
    SELECT_FILE: 0,
    PDF_HANDLING: 1,
}

export const step = writable(STEPS.SELECT_FILE);
export const selectedFile = writable<String>("");
export const convertedFile = writable<String>("");






export const columns = writable<Column[]>([]);
export const workingColumnIdx = writable(-1);

export const selectColumn = (columnId: String) => {
    const columnIdx = get(columns).findIndex((column) => column.id === columnId);
    const column = get(columns)[columnIdx];
    
    if (columnIdx < 0 || column == null) return;
    
    workingColumnIdx.set(columnIdx);
    document.documentElement.style.setProperty('--working-column-background-color', column.color.backgroundColor as string);
    document.documentElement.style.setProperty('--working-column-text-color', column.color.textColor as string);
}

export const getSelectedColumn = () => {
    const columnIdx = get(workingColumnIdx);

    if (columnIdx < 0) return null;
    return get(columns)[columnIdx];
}

export const makeColumn = (name: String) => {
    const column = {
        name,
        id: uuidv4(),
        values: [],
        color: utils.generateContrastColors(),
    }
    columns.update((cols) => [...cols, column]);

    if (get(workingColumnIdx) === -1) selectColumn(column.id);
    return column;
}

export const removeColumn = (columnId: String) => {
    columns.update((cols) => cols.filter((column) => column.id !== columnId));
}


let rowActionCount = 0;
export const makeValue = (value: String) => {
    const columnIdx = get(workingColumnIdx);
    const columnItems = get(columns)[columnIdx];
    if (columnIdx < 0 || columnItems === undefined) return;

    const newValue = {
        id: uuidv4(),
        value,
        column: columnIdx,
        row: columnItems.values.length + 1,
        actionNumber: rowActionCount++,
    }

    columns.update((cols) => {
        cols[columnIdx].values.push(newValue);
        return cols;
    });

    return newValue;
}

export const removeValue = (valueId: String) => {
    const columnIdx = get(workingColumnIdx);
    const columnItems = get(columns)[columnIdx];
    if (columnIdx < 0 || columnItems === undefined) return;

    columns.update((cols) => {
        cols[columnIdx].values = cols[columnIdx].values.filter((value) => value.id !== valueId);
        return cols;
    });
}

export const undoLastAction = () => {
    const columnIdx = get(workingColumnIdx);
    const columnItems = get(columns)[columnIdx];

    if (columnIdx < 0 || columnItems === undefined) return;

    const lastAction = columnItems.values[columnItems.values.length - 1].actionNumber;

    columns.update((cols) => {
        cols[columnIdx].values = cols[columnIdx].values.filter((value) => value.actionNumber !== lastAction);
        return cols;
    });
}

// could return null or string
export const getCurrentColor = () : Color | null => {
    const columnIdx = get(workingColumnIdx);
    const columnItems = get(columns)[columnIdx];

    if (columnIdx < 0 || columnItems === undefined) return null;

    return columnItems.color;
}