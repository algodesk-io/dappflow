import './AppCallTxnGlobalStateDelta.scss';
import React from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {dataGridCellConfig, dataGridStyles} from "../../theme/styles/datagrid";
import NumberFormat from "react-number-format";
import {theme} from "../../theme";
import {A_GlobalStateDelta} from "../../packages/core-sdk/types";
import {CoreGlobalState} from "../../packages/core-sdk/classes/CoreGlobalStateDelta";


function AppCallTxnGlobalStateDelta(props): JSX.Element {

    let globalStateDelta: A_GlobalStateDelta[] = props.state;
    if (!globalStateDelta) {
        globalStateDelta = [];
    }

    const columns: GridColDef[] = [
        {
            ...dataGridCellConfig,
            field: 'key',
            headerName: 'Key',
            renderCell: (params: GridValueGetterParams) => {
                const gStateDeltaInstance = new CoreGlobalState(params.row);
                return <div>
                    {gStateDeltaInstance.getKey()}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'type',
            headerName: 'Type',
            renderCell: (params: GridValueGetterParams) => {
                const gStateDeltaInstance = new CoreGlobalState(params.row);
                return <div>
                    {gStateDeltaInstance.getType()}
                </div>;
            }
        },
        {
            ...dataGridCellConfig,
            field: 'value',
            headerName: 'Value',
            flex: 2,
            renderCell: (params: GridValueGetterParams) => {
                const gStateDeltaInstance = new CoreGlobalState(params.row);
                return <div>
                    {params.row.type === 'Uint' ? <NumberFormat
                        value={gStateDeltaInstance.getValue()}
                        displayType={'text'}
                        thousandSeparator={true}
                    ></NumberFormat> : gStateDeltaInstance.getValue()}
                </div>;
            }
        }
    ];

    return (<div className={"app-call-txn-global-state-delta-wrapper"}>
        <div className={"app-call-txn-global-state-delta-container"}>
            <div className="app-call-txn-global-state-delta-body">


                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={globalStateDelta}
                        columns={columns}
                        rowsPerPageOptions={[]}
                        disableSelectionOnClick
                        sx={{
                            ...dataGridStyles,
                            '.MuiDataGrid-columnHeader': {
                                background: theme.palette.common.black,
                                color: theme.palette.common.white
                            }
                        }}
                        getRowId={(row) => {
                            return row.key;
                        }}
                    />
                </div>


            </div>
        </div>
    </div>);
}

export default AppCallTxnGlobalStateDelta;
