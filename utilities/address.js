export const form = {
    BuildingNo : "",
    RowNo : "",
    FlatNo : "",
    Street : "",
    Remark : "",
    Main : "",
    AreaNo : "",
    Main : 0,
    PhSerial : ""
}


export const rules = {
    BuildingNo : [
        v => !!v || 'Building Field is required',
    ],
    RowNo : [
        v => !!v || 'Row Field is required',
    ],
    FlatNo : [
        v => !!v || 'Flat Field is required',
    ],
    Street : [
        v => !!v || 'Street Field is required',
    ],
    Remark : [],
    Main : [],
    AreaNo : [
        v => !!v || 'Area Field is required',
    ],
    PhSerial : [
        v => !!v || 'Phone Field is required',
    ]
}

export const errors = {
    BuildingNo : [],
    RowNo : [],
    FlatNo : [],
    Street : [],
    Remark : [],
    Main :[],
    AreaNo :[],
    PhSerial: []
}