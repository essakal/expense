import { useEffect, useState } from "react";
import styles from './form.module.css';
import swal from 'sweetalert';
import { AiFillDelete } from "react-icons/ai";
import 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';


function Form() {

    const [title, setTitle] = useState(0);
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [catinp, setcatinp] = useState('');
    const [cat, setCat] = useState(["car", "house", "clothing", "health", "travel", "food"]);
    const [info, setInfo] = useState([
        { id: 0, date: "2022-10-07", title: 200, type: "car" },
        { id: 1, date: "2022-11-30", title: 173, type: "health" },
    ]);



    const [sumweek, setSumweek] = useState([]);
    const [summonth, setSummonth] = useState([]);
    const [sumyear, setSumyear] = useState([]);
    const [t, sett] = useState([]);

    
    // calcul sum for every category
    useEffect(() => {
        const t = [];

        for (var i of cat) {
            let s = 0;
            let x = false;
            for (var key of info) {
                if (i === key.type) {
                    s += key.title;
                    x = true;
                }
            }
            if (x) {
                t.push(s)
            } else {
                t.push(0)
            }
        }
        sett(t);
    }, [info, cat])

    // sum: week, month, year
    useEffect(() => {
        const date1 = new Date();
        // --------last week--------
        setSumweek(
            info.filter(e => {
                const date2 = new Date(e.date);
                const diffTime = (date1 - date2);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return (diffDays < 7 && diffDays >= 0)
            })
        )
        // --------last month--------
        setSummonth(
            info.filter(e => {
                const date2 = new Date(e.date);
                const diffTime = date1 - date2;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays < 30 && diffDays >= 0
            })
        )
        // --------last year--------
        setSumyear(
            info.filter(e => {
                const date2 = new Date(e.date);
                const diffTime = date1 - date2;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays < 365 && diffDays >= 0
            })
        )
    }, [info])

    // change money input
    function handelTitle(e) {
        setTitle(parseInt(e.target.value));
    }
    // change category input
    function handelType(e) {
        setType(e.target.value);
    }
    // change date input
    function handelDate(e) {
        setDate(e.target.value);
    }
    // change new category input
    function handelcat(e) {
        setcatinp(e.target.value);
    }

    // add new category
    function handelClick2(e) {
        e.preventDefault();
        const myarr = [...cat]
        if (cat.includes(catinp)) {
            swal("This category already exists!", "", "error");
            setcatinp('')
        } else {
            if (catinp.replace(/\s/g, '') === '') {
                swal("There is an empty field!", "", "error");
            } else {
                myarr.push(catinp);
                setCat(myarr)
                setcatinp('')
                swal("Category added successfully!", "", "success");
            }

        }

    }

    // add new Expenses
    function handelClick(e) {
        e.preventDefault();
        const myArr = [...info];

        if (title !== 0 && type !== "" && date !== "") {
            const isFound = info.some(element => {
                if (element.title === title && element.type === type && element.date === date) {
                    return true;
                }
                return false;
            });

            if (!isFound) {
                var x;
                if (info.length === 0) {
                    x = 0
                }
                else {
                    x = info[info.length - 1].id + 1
                };
                myArr.push({
                    id: x,
                    title: title,
                    type: type,
                    date: date
                });

                swal("Added successfully", "", "success");
                setInfo(myArr);
                setTitle(0);
                setType("");
                setDate("");
            } else {
                swal("There is already", "", "error");
            }
        }
        else {
            swal("There is an empty field!", "", "error");
        }
    }


    // for top button scroll 
    function topFunction() {
        document.documentElement.scrollTop = 0; 
    }


    // data diagrams
    const data = {
        labels: [...cat],
        datasets: [{
            label:"statics",
            data: [...t],
            backgroundColor: [
                "#8d3bb9",
                "#4266bc",
                "#33acaf",
                "#33d632",
                "#b3f234",
                "#ffff00",
                "#ffbb35",
                "#ff7301",
                "#ff3233",
            ]
        }]
    };


    return (
        <div className={styles.parent}>
            <div className={styles.container} id="home">
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#div">Expenses</a></li>
                        <li><a href="#statics">Statics</a></li>
                        <li><a href="#diagrams">Diagrams</a></li>
                    </ul>
                </nav>
                {/* <h1>Expense management</h1> */}
                <form className={styles.form}>
                    <div className={styles.div}>
                        <label htmlFor="">amount</label>
                        <input onChange={handelTitle} value={title} className={styles.npt} type="number" min='1' placeholder="Entrez le montant..." />
                    </div>
                    <div className={styles.div}>
                        <label htmlFor="">Category</label>
                        <select onChange={handelType} name="" id="" className={styles.npt} value={type}>
                            <option value="">-- categorie --</option>
                            {cat.map((item, index) =>
                                <option key={index} value={item}>{item}</option>
                            )}
                        </select>
                    </div>
                    <div className={styles.div}>
                        <label htmlFor="">date</label>
                        <input onChange={handelDate} value={date} className={styles.npt} type="date" />
                    </div>
                    <div className={styles.div}>
                        <button onClick={handelClick}>Add Expense</button>
                    </div>

                </form>

                <form className={styles.form}>
                    <div className={styles.div}>
                        <label htmlFor="">Enter a new category</label>
                        <input onChange={handelcat} value={catinp} className={styles.npt} type="text" placeholder="entrez la categirie..." />
                    </div>
                    <div className={styles.div}>
                        <button onClick={handelClick2}>Add Category</button>
                    </div>

                </form>
            </div>

            <div className={styles.table} id="div">

                <table>
                    <thead>
                        <tr>
                            <th>montant</th>
                            <th>type</th>
                            <th>date</th>
                            <th>action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {info.map((item) => <tr key={item.id}>
                            <td>{item.title}.00 $</td>
                            <td>{item.type}</td>
                            <td>{item.date}</td>
                            <td>
                                {/* <button><AiFillEdit /></button> */}
                                <button onClick={() => setInfo(current =>

                                    current.filter(e => { return e.id !== item.id; }),
                                    swal("Deleted!", "It has been deleted successfully.", "success")
                                )
                                }><AiFillDelete /></button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div id="statics" className={styles.statics}>

                <div className={styles.table2}>
                    <h1>statics</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Total</td>
                                <td>last week</td>
                                <td>last month</td>
                                <td>last year</td>
                            </tr>
                            <tr>
                                <td>{(info.reduce((a, v) => a = a + v.title, 0))}.00 $</td>
                                <td>{(sumweek.reduce((x, y) => x = x + y.title, 0))}.00 $</td>
                                <td>{(summonth.reduce((a, v) => a = a + v.title, 0))}.00 $</td>
                                <td>{(sumyear.reduce((a, v) => a = a + v.title, 0))}.00 $</td>
                            </tr>
                        </tbody>

                    </table>

                </div>

            </div>
            <div id="diagrams" className={styles.diagrams}>
                <div>
                    <Doughnut data={data} />
                </div>
                <div>
                    <Bar data={data} />
                </div>


            </div>
            <button className={styles.btn} onClick={topFunction}>top</button>
        </div>

    )
}

export default Form;