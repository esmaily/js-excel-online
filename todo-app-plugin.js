
/*------------------------------------------------------------------------------- Data Grid list js
   ------------------------------------------------------------------------------------------- */


class App {
    constructor(elementId) {
        this.el=elementId
        this.dataList = [
            {
                "supplier": "ali ahmadi",
                "from_date": "2019-05-18",
                "to_date": "2019-05-23",
                "type": "weekly",
                "capacity": 4,
                "currency": "rial",
                "cost": 2500,
                "car": "benz",
            },
            {
                "supplier": "reza yary",
                "from_date": "2018-05-18",
                "to_date": "2018-05-23",
                "type": "daily",
                "capacity": 7,
                "currency": "dollar",
                "cost": 8200,
                "car": "bmv",
            },
            {
                "supplier": "mohamnd abadi",
                "from_date": "2014-05-18",
                "to_date": "2014-11-13",
                "type": "trip",
                "capacity": 3,
                "currency": "derham",
                "cost": 64200,
                "car": "bmv",
            },
            {
                "supplier": "hamed ahmadi",
                "from_date": "2019-05-18",
                "to_date": "2019-05-23",
                "type": "weekly",
                "capacity": 2,
                "currency": "rial",
                "cost": 2500,
                "car": "benz",
            },
            {
                "supplier": "koroosh yary",
                "from_date": "2018-05-18",
                "to_date": "2018-05-23",
                "type": "daily",
                "capacity": 7,
                "currency": "dollar",
                "cost": 8200,
                "car": "bmv",
            },
            {
                "supplier": "ahmad abadi",
                "from_date": "2014-05-18",
                "to_date": "2014-11-13",
                "type": "mohthly",
                "capacity": 123,
                "currency": "derham",
                "cost": 8400,
                "car": "bmv",
            },
        ]
    }

    renderList() {
        let tableItems = '';
        this.dataList.forEach((item,index)=>{
            tableItems += this.trItem(index,  item)
        })
        for(let item=(this.dataList.length -1);item >-1;--item){

        }
        $(`#${this.el} tbody`).html(tableItems);
        $(`#${this.el}`).exceltable();
    }

    remove(index) {
        this.dataList.splice(index, 1)
        this.renderList()
    }

    getItem(index) {
        return this.dataList[index];
    }

    duplicate(index) {
        let thisItem=this.getItem(index);
        this.dataList.splice(index, 0, thisItem);
        this.renderList()
    }

    addItem(item) {
        this.dataList.push(item)
        this.renderList()
    }
    trItem(index, item) {
        return `<tr id="tr-${index}">
                        <td class="index">${index + 1}</td>
                        <td class="is-grid"><input type='text' class='editable' value='${item.supplier}'></td>
                        <td class="is-grid"><input type='text' class='editable' value='${item.from_date}'></td>
                        <td class="is-grid"><input type='text' class='editable' value='${item.to_date}'></td>
                        <td class="is-grid"><input type='text' class='editable' value='${item.type}'></td>
                        <td class="is-grid"><input type='text' class='editable' value='${item.capacity}'></td>
                        <td class="is-grid"><input type='text' class='editable' value='${item.currency}'></td>
                        <td class="is-grid"><input type='text' class='editable' value='${item.cost}'></td>
                        <td class="is-grid"><input type='text' class='editable' value='${item.car}'></td>
                        <td class="opt">
                            <div class="operation-btn">
                                <div class="btn-item duplicate-btn  ">
                                    <button class="btn btn-info p-2 btn-duplicate"  data-content="${index}" ><i class="fa fa-copy"></i></button>
                                </div>
                                <div class="btn-item remove-btn-yield  pl-2">
                                   <button class="btn btn-danger btn-remove p-2" data-content="${index}"><i   class="fa fa-trash"></i></button>
                                </div>
                            </div>
                        </td>
                    </tr>`
    }
}

let __app = new App('dataListTable');
__app.renderList();

$('#dataListTable').on('click','.btn-remove',function (e) {
    __app.remove(parseInt($(this).attr('data-content')))
});

$('#dataListTable').on('click', '.btn-duplicate',function (e) {
    __app.duplicate(parseInt($(this).attr('data-content')))
});




