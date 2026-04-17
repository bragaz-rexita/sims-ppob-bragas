import { Button, ConfigProvider, Space, Tooltip } from 'antd';

const AppButtonSubmit = (props) => {
    return (
        <ConfigProvider
            theme={{
                token: { colorBgContainer: '#2732cf' },
                // components: {
                //     Button: {
                //         defaultBg: '#4b56fa',
                //         defaultColor: '#FFFFFF',
                //         defaultBorderColor: '#4b56fa',
                //         defaultHoverColor: '#4b56fa',
                //         defaultHoverBorderColor: '#4b56fa',
                //         defaultHoverBg: '#d7d9f7'
                //     },
                // },
                components: {
                    Button: {
                        defaultBg: '#4b56fa',
                        defaultColor: '#FFFFFF',
                        defaultBorderColor: '#4b56fa',
                        defaultHoverColor: '#FFFFFF',
                        defaultHoverBorderColor: '#2732cf',
                        defaultHoverBg: '#2732cf',
                    },
                },
            }}
        >
            <Button {...props} onClick={props.onClick} icon={props.icon} className="fontButton">
                {props.label}
            </Button>
        </ConfigProvider>
    );
};

const AppButtonCancel = (props) => {
    return (
        <ConfigProvider
            theme={{
                token: { colorBgContainer: '#d7d9f7' },
                components: {
                    Button: {
                        // defaultBg: '#4b56fa',
                        // defaultColor: '#FFFFFF',
                        // defaultBorderColor: '#4b56fa',
                        // defaultHoverColor: '#4b56fa',
                        // defaultHoverBorderColor: '#4b56fa',
                        // defaultHoverBg: '#d7d9f7'

                        defaultBg: '#FFFFFF',
                        defaultColor: '#4b56fa',
                        defaultBorderColor: '#4b56fa',
                        defaultHoverColor: '#4b56fa',
                        defaultHoverBorderColor: '#4b56fa',
                        defaultHoverBg: '#f2f3fc',
                    },
                },
            }}
        >
            <Button {...props} onClick={props.onClick} icon={props.icon} className="fontButton">
                {props.label}
            </Button>
        </ConfigProvider>
    );
};

const AppButtonActionTable = (props) => {
    return (
        <Space size="small">
            {props.onClickPreview && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#23A55A',
                                defaultBorderColor: '#23A55A',
                            },
                        },
                    }}
                >
                    <Tooltip title="Lihat" placement="top">
                        <Button
                            onClick={props.onClickPreview}
                            icon={props.iconPreview}
                            className="fontButton"
                        />
                    </Tooltip>
                </ConfigProvider>
            )}

            {props.onClickEdit && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#F6CE22',
                                defaultBorderColor: '#F6CE22',
                            },
                        },
                    }}
                >
                    <Tooltip title="Edit" placement="top">
                        <Button
                            onClick={props.onClickEdit}
                            icon={props.iconEdit}
                            className="fontButton"
                        >
                            {props.text ?? ''}
                        </Button>
                    </Tooltip>
                </ConfigProvider>
            )}

            {props.onClickPrint && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#4b56fa',
                                defaultBorderColor: '#4b56fa',
                            },
                        },
                    }}
                >
                    <Tooltip title="Cetak" placement="top">
                        <Button
                            onClick={props.onClickPrint}
                            icon={props.iconPrint}
                            className="fontButton"
                        >
                            {props.text ?? ''}
                        </Button>
                    </Tooltip>
                </ConfigProvider>
            )}

            {props.onClickDelete && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#F14950',
                                defaultBorderColor: '#F14950',
                            },
                        },
                    }}
                >
                    <Tooltip title="Hapus" placement="top">
                        <Button
                            onClick={props.onClickDelete}
                            icon={props.iconDelete}
                            className="fontButton"
                        />
                    </Tooltip>
                </ConfigProvider>
            )}

            {props.onClickSave && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#23A55A',
                                defaultBorderColor: '#23A55A',
                            },
                        },
                    }}
                >
                    <Tooltip title="Simpan" placement="top">
                        <Button
                            onClick={props.onClickSave}
                            icon={props.iconSave}
                            className="fontButton"
                        />
                    </Tooltip>
                </ConfigProvider>
            )}

            {props.onClickCancel && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#F14950',
                                defaultBorderColor: '#F14950',
                            },
                        },
                    }}
                >
                    <Tooltip title="Batal" placement="top">
                        <Button
                            onClick={props.onClickCancel}
                            icon={props.iconCancel}
                            className="fontButton"
                        />
                    </Tooltip>
                </ConfigProvider>
            )}

            {props.shortcutStockOpname && (
                <>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultBg: 'white',
                                    defaultColor: 'green',
                                    defaultBorderColor: 'green',
                                },
                            },
                        }}
                    >
                        <Tooltip
                            title="Kosong"
                            placement="top"
                            style={{ backgroundColor: 'green' }}
                        >
                            <Button
                                onClick={(e) => {
                                    props.onClick(props.record, props.record.system_stock);
                                }}
                                className="fontButton"
                            >
                                Stok Sesuai
                            </Button>
                        </Tooltip>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultBg: 'white',
                                    defaultColor: '#F14950',
                                    defaultBorderColor: '#F14950',
                                },
                            },
                        }}
                    >
                        <Tooltip title="Kosong" placement="top">
                            <Button
                                onClick={(e) => {
                                    props.onClick(props.record, 0);
                                }}
                                className="fontButton"
                            >
                                Stok 0
                            </Button>
                        </Tooltip>
                    </ConfigProvider>
                </>
            )}
        </Space>
    );
};

const AppButtonActionEditable = (props) => {
    return (
        <Space size="small">
            {props.onClickPreview && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#23A55A',
                                defaultBorderColor: '#23A55A',
                            },
                        },
                    }}
                >
                    <Button onClick={props.onClickPreview} className="fontButton">
                        {props.label}
                    </Button>
                </ConfigProvider>
            )}

            {props.onClickEdit && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#F6CE22',
                                defaultBorderColor: '#F6CE22',
                            },
                        },
                    }}
                >
                    <Button
                        onClick={props.onClickEdit}
                        className="fontButton"
                        style={{ padding: '0px 5px 0px 5px', height: '25px', fontSize: '13px' }}
                    >
                        {props.label}
                    </Button>
                </ConfigProvider>
            )}

            {props.onClickDelete && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#F14950',
                                defaultBorderColor: '#F14950',
                            },
                        },
                    }}
                >
                    <Button
                        onClick={props.onClickDelete}
                        className="fontButton"
                        style={{ padding: '0px 5px 0px 5px', height: '25px', fontSize: '13px' }}
                    >
                        {props.label}
                    </Button>
                </ConfigProvider>
            )}

            {props.onClickSave && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#23A55A',
                                defaultBorderColor: '#23A55A',
                            },
                        },
                    }}
                >
                    <Button onClick={props.onClickSave} className="fontButton">
                        {props.label}
                    </Button>
                </ConfigProvider>
            )}

            {props.onClickCancel && (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultBg: 'white',
                                defaultColor: '#F14950',
                                defaultBorderColor: '#F14950',
                            },
                        },
                    }}
                >
                    <Button onClick={props.onClickCancel} className="fontButton">
                        {props.label}
                    </Button>
                </ConfigProvider>
            )}
        </Space>
    );
};

export { AppButtonSubmit, AppButtonCancel, AppButtonActionTable, AppButtonActionEditable };
