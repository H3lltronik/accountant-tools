type Value = {
    id: String,
    value: String,
    column: Number,
    row: Number,
    actionNumber: Number,
}

type Column = {
    id: String,
    name: String,
    values: Value[],
    color: {
        backgroundColor: String,
        textColor: String,
    },
}

type Color = {
    backgroundColor: String,
    textColor: String,
}