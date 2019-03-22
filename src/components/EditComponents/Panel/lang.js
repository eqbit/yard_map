import L from 'leaflet';

L.drawLocal = {
    draw: {
        toolbar: {
            actions: {
                title: "",
                text: "Отмена"
            },
            finish: {
                title: "",
                text: "Завершить"
            },
            undo: {
                title: "",
                text: "Удалить последнюю точку"
            },
            buttons: {
                polyline: "Draw a polyline",
                polygon: "Добавить область",
                rectangle: "Draw a rectangle",
                circle: "Draw a circle",
                marker: "Добавить маркер",
                circlemarker: "Draw a circlemarker"
            }
        },
        handlers: {
            circle: {
                tooltip: {
                    start: "Click and drag to draw circle."
                },
                radius: "Radius"
            },
            circlemarker: {
                tooltip: {
                    start: "Click map to place circle marker."
                }
            },
            marker: {
                tooltip: {
                    start: "Щелкните по карте, чтобы добавить метку"
                }
            },
            polygon: {
                tooltip: {
                    start: "Щелкните по карте, чтобы начать фигуру",
                    cont: "Клик, чтобы добавить опорную точку",
                    end: "Щелкните по первой созданной точке, чтобы завершуть фигуру"
                }
            },
            polyline: {
                error: "<strong>Error:</strong> shape edges cannot cross!",
                tooltip: {
                    start: "Click to start drawing line.",
                    cont: "Click to continue drawing line.",
                    end: "Click last point to finish line."
                }
            },
            rectangle: {
                tooltip: {
                    start: "Click and drag to draw rectangle."
                }
            },
            simpleshape: {
                tooltip: {
                    end: "Release mouse to finish drawing."
                }
            }
        }
    },
    edit: {
        toolbar: {
            actions: {
                save: {
                    title: "",
                    text: "Сохранить"
                },
                cancel: {
                    title: "Сбросить изменения",
                    text: "Отмена"
                },
                clearAll: {
                    title: "Удалить все созданные объекты",
                    text: "Очистить"
                }
            },
            buttons: {
                edit: "Редактировать",
                editDisabled: "Нет объектов",
                remove: "Удалить созданные объекты",
                removeDisabled: "Нет объектов"
            }
        },
        handlers: {
            edit: {
                tooltip: {
                    text: "Вы можете передвигать точки/метки",
                    subtext: "Щелкните \"Отмена\" для отмены изменений"
                }
            },
            remove: {
                tooltip: {
                    text: "Щелкните по объекту, чтобы удалить его"
                }
            }
        }
    }
}