const CDATE = function () {
    const DONE = { __proto__: null };
    const MONTHS = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const _TABLE = createTable();
    function defArg(v, d) {
        if (v) {
            return v;
        }
        return d;
    }
    function displayCalendar(a) {
        const calendar = document.createElement("div");
        calendar.id = "calendar";
        const selects = document.createElement("div");
        selects.className = "select";
        const selYear = document.createElement("select");
        selYear.id = "CDATE-Year";
        const selMonth = document.createElement("select");
        selMonth.id = "CDATE-Month";
        MONTHS.forEach(function (e, i) {
            let a = document.createElement("option");
            a.dataset.month = i;
            a.value = e;
            a.textContent = e;
            selMonth.appendChild(a);
            if (i == new Date().getMonth()) {
                a.selected = true;
            }
        });
        for (let i = a.minYear; i < a.maxYear; i++) {
            let a = document.createElement("option");
            a.value = i;
            a.textContent = i;
            selYear.appendChild(a);
            if (a.value == new Date().getFullYear()) {
                a.selected = true;
            }
        }

        selYear.addEventListener("change", calendarChange);
        selMonth.addEventListener("change", calendarChange);
        if (a.useArrow === true) {
            const leftArr = document.createElement("i");
            const rightArr = document.createElement("i");
            leftArr.className = "material-symbols-outlined left";
            rightArr.className = "material-symbols-outlined right";
            leftArr.textContent = "arrow_back_ios";
            rightArr.textContent = "arrow_forward_ios";
            leftArr.style.fontSize = "14px";
            rightArr.style.fontSize = "14px";
            leftArr.addEventListener("click", function () {
                useArrows("l");
            });
            rightArr.addEventListener("click", function () {
                useArrows("r");
            });
            selects.append(leftArr, selMonth, selYear, rightArr);
        } else {
            selects.append(selMonth, selYear);
        }
        calendar.appendChild(selects);
        createDate(selYear, selMonth, undefined);
        calendar.appendChild(_TABLE);
        document.querySelector(a.el).appendChild(calendar);
    }
    function createDate(y, m, d) {
        const MIndex = m.selectedIndex;
        const yearSelected = y.options[y.selectedIndex].value;
        if (DONE[yearSelected] && DONE[yearSelected][MIndex]) {
            let table = document.querySelector("#calendar-table");
            let tb = table.querySelector("tbody");
            if (tb) {
                tb.remove();
                table.appendChild(DONE[yearSelected][MIndex]);
            }
        } else {
            d = defArg(d, new Date().getDate());
            const date = new Date(parseInt(yearSelected), parseInt(MIndex), 1);
            const date2 = new Date();
            let leapYear;
            let dayCounter = date.getDay() + 1;
            let currDate = 1;
            if (date2.getFullYear() % 4 === 0) {
                leapYear = 29;
            } else {
                leapYear = 28;
            }
            const dates = [31, leapYear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            const tbody = _TABLE.createTBody();
            let setDate = dates[MIndex];
            for (let i = 1; i < 7; i++) {
                const tr = document.createElement("tr");
                for (let b = 1; b < 8; b++) {
                    const td = document.createElement("td");
                    td.className = "CDATE-present";
                    if (b >= dayCounter) {
                        dayCounter = -1;
                        td.textContent = currDate;
                        td.setAttribute("value", currDate);
                        let d = new Date();
                        if (
                            parseInt(td.textContent) == d.getDate() &&
                            MIndex == d.getMonth() &&
                            parseInt(yearSelected) === d.getFullYear()
                        ) {
                            td.classList.add("active");
                        }
                        if (currDate > setDate) {
                            break;
                        }
                        currDate += 1;
                    }
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            if (DONE[yearSelected] === undefined) {
                DONE[yearSelected] = {};
                DONE[yearSelected][MIndex] = tbody;
            } else {
                DONE[yearSelected][MIndex] = tbody;
            }
            if (_TABLE.querySelector("tbody")) {
                _TABLE.removeChild(_TABLE.querySelector("tbody"));
            }
            _TABLE.appendChild(tbody);

            //   console.log(DONE);
        }
    }
    function writeDays() {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const ths = [];
        days.forEach(function (day) {
            const th = document.createElement("th");
            th.setAttribute("day", day);
            th.textContent = day;
            ths.push(th);
        });
        return ths;
    }

    function createTable() {
        const table = document.createElement("table");
        const thead = table.createTHead();
        const tr = document.createElement("tr");
        writeDays().forEach(function (el) {
            tr.appendChild(el);
        });
        thead.appendChild(tr);
        table.appendChild(thead);
        table.id = "calendar-table";
        return table;
    }

    function calendarChange() {
        const m = document.querySelector("#CDATE-Month");
        const y = document.querySelector("#CDATE-Year");
        createDate(y, m);
    }

    function useArrows(a) {
        console.time("2");
        const m = document.querySelector("#CDATE-Month");
        const y = document.querySelector("#CDATE-Year");
        if (a == "l") {
            y.selectedIndex =
                m.selectedIndex > 0
                    ? ((m.selectedIndex -= 1), y.selectedIndex)
                    : (!y.selectedIndex && !m.selectedIndex
                        ? null
                        : !m.selectedIndex
                            ? (m.selectedIndex = 11)
                            : (m.selectedIndex -= 1),
                        y.selectedIndex > 0 ? (y.selectedIndex -= 1) : y.selectedIndex);
            createDate(y, m);
        } else if (a == "r") {
            y.selectedIndex =
                m.selectedIndex < 11
                    ? ((m.selectedIndex += 1), y.selectedIndex)
                    : (y.selectedIndex === y.options.length - 1 && m.selectedIndex === 11
                        ? null
                        : m.selectedIndex == 11
                            ? (m.selectedIndex = 0)
                            : (m.selectedIndex += 1),
                        y.selectedIndex !== y.options.length - 1
                            ? (y.selectedIndex += 1)
                            : y.selectedIndex);
            createDate(y, m);
        }
        console.timeEnd("2");
    }

    return {
        __proto__: null,
        createCalendar: function (a) {
            if (typeof a !== "object") {
                throw "Expected argument to be of type object!";
            }
            a.el = defArg(a.el, "body");
            const year = new Date().getFullYear();
            a.maxYear = defArg(parseInt(defArg(a.maxYear, year + 20)), year + 20);
            a.minYear = defArg(parseInt(defArg(a.minYear, year - 20)), year - 20);
            if (a.minYear > a.maxYear) {
                a.minYear = a.maxYear - 2;
            }
            a.useArrow = defArg(a.useArrow, false);
            console.time("display");
            displayCalendar(a);
            console.timeEnd("display");
            return {
                output: function (e) {
                    if (typeof e !== "object") {
                        throw new Error("Expected argument to be of type Object!");
                    }
                },
            };
        },
    };
};
