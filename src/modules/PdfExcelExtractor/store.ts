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

export const columnsModalOpen = writable(false);
export const previewModalOpen = writable(false);





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

export const editColumn = (columnId: String, name: String) => {
    const columnIdx = get(columns).findIndex((column) => column.id === columnId);
    if (columnIdx < 0) return;

    columns.update((cols) => {
        cols[columnIdx].name = name;
        return cols;
    });
}

export const removeColumn = (columnId: String): Boolean => {
    const columnIdx = get(columns).findIndex((column) => column.id === columnId);
    if (columnIdx == undefined && columnIdx == null) return false;

    columns.update((cols) => cols.filter((column) => column.id !== columnId));
    
    if ( get(columns).length === 0 ) {
        workingColumnIdx.set(-1);
        document.documentElement.style.removeProperty('--working-column-background-color');
        document.documentElement.style.removeProperty('--working-column-text-color');
    } else {
        selectColumn(get(columns)[0].id);
    }

    const elements = document.querySelectorAll(`[data-column-id="${columnId}"]`);
    elements.forEach((element: any) => {
        element.style.removeProperty('background-color');
        element.style.removeProperty('color');
        element.removeAttribute('data-column-id');
    });

    return true;
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

export const removeValue = (valueId: String): Boolean => {
    const columnIdx = get(workingColumnIdx);
    const column = get(columns);

    const valueColumn = column.find((column) => column.values.find((value) => value.id === valueId));
    if (valueColumn === undefined || valueColumn.id !== column[columnIdx].id) return false;

    const columnItems = column[columnIdx];

    if (columnIdx < 0 || columnItems === undefined) return false;

    columns.update((cols) => {
        cols[columnIdx].values = cols[columnIdx].values.filter((value) => value.id !== valueId);
        return cols;
    });

    return true;
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

export const reset = () => {
    columns.set([]);
    workingColumnIdx.set(-1);
    document.documentElement.style.removeProperty('--working-column-background-color');
    document.documentElement.style.removeProperty('--working-column-text-color');

    selectedFile.set("");
    convertedFile.set("");
}