var Grid = function () {

}

/*
*  Set grid  data
* @param elementId string
* @param fields object
* @param data array
* @param excelTable boolean
* */

Grid.prototype.init = function (params) {
    this.primaryKey = params.hasOwnProperty('primaryKey') ? params['primaryKey'] : 'id'
    this.gridId = params['gridId']
    this.table = params['gridId'].toLowerCase().split('_list')[0]
    this.tableFields = params['fields']
    this.dataList = params.hasOwnProperty('data') ? params['data'] : []
    this.setting = {
        excel_table: params.hasOwnProperty('excelTable') ? params['excelTable'] : true
    }
    this.renderList()

    $(`#${this.gridId}`).on('click', '.btn-remove', function (e) {
        __grid.remove(parseInt($(this).attr('data-content')))
    });

    $(`#${this.gridId}`).on('click', '.btn-duplicate', function (e) {
        __grid.duplicate(parseInt($(this).attr('data-content')))
    });
    $(`#${this.gridId}`).on('click', '.btn-save', function (e) {
        __grid.save(parseInt($(this).attr('data-content')))
    });
    $(`#${this.gridId}`).on('click', '.btn-newItem', function (e) {
        __grid.addItem()
    });
    $(`#${this.gridId}`).on('click', '.btn-clipboard', function (e) {
        __grid.addFromClipboard()
    });

}
/*
*  Render grid
*
* */
Grid.prototype.renderList = function () {
    this.renderThead()
    let tableItems = '';

    for (let item = (this.dataList.length - 1); item > -1; --item) {
        tableItems += this.bodyItem(item, this.dataList[item])
    }
    $(`#${this.gridId} tbody`).html(tableItems);
    this.setting['excel_table'] ? $(`#${this.gridId}`).exceltable() : null;

}
/*
*  Remove item in data
* @param item index  integer
*
* */
Grid.prototype.remove = function (index) {
    if (this.dataList[index][this.primaryKey]) {
        __app.ajax({
            key: "delete_item",
            table_name: this.table,
            id: this.dataList[index][this.primaryKey]
        })
    }

    this.dataList.splice(index, 1)
    this.renderList()
}
/*
*  store in database
* @param item index  object
*
* */
Grid.prototype.save = function (index) {
    console.log(this.dataList[index]);
    console.log(index);
}

/*
*  return item by index
* @param item index  integer
*
* */
Grid.prototype.getItem = function (index) {
    return this.dataList[index];
}

/*
*  duplicate item by index
* @param item index  integer
*
* */
Grid.prototype.duplicate = function (index) {
    let thisItem = this.getItem(index);
    index += 1
    let newTr = Object.assign({}, thisItem)
    newTr[this.primaryKey] = '';
    Object.assign(newTr, {duplicate: true})
    this.dataList.splice(index, 0, newTr);
    this.renderList()
}

/*
*  Add  new item in data
* @param item    object
*
* */
Grid.prototype.newItem = function () {

    for (let item in this.dataList[0]){
          console.log(item);
    }

    this.renderList()
}
/*
*  Add item in data
* @param item    object
*
* */
Grid.prototype.addItem = function (item) {
    this.dataList.push(item)
    this.renderList()
}
/*
*  Add item in data
* @param item    object
*
* */
Grid.prototype.getTable = function () {
    return this.table
}
Grid.prototype.addFromClipboard=function(){
    let text = e.clipboardData.getData("text");
    let data = text.split('\n')
    data.forEach((item, index) => {
        if (item.length > 1) {
            let newTr = Object.assign({}, this.dataList[0])
            Object.keys(newTr).forEach((key, index) => {
                let excelFields = item.split('\t')
                newTr[key] = index < excelFields.length ?  excelFields[index] :   ' '
            })
            Object.assign(newTr, {duplicate: true})
            this.dataList.push(newTr)
        }
    })
    this.renderList()
}
/*
*  Render head grid
*
* */
Grid.prototype.renderThead = function () {
    let trTh = '<tr>  <th style="background-color:#424242">#</th>'
    for (let key in this.tableFields) {
        trTh += `<th style="background-color:${this.tableFields[key].bg}">${__app.camelCase(this.tableFields[key].label)}</th>`
    }
    trTh += `
    <th style="background-color:#424242" class="th-opt"> 
     <div class="operation-btn">
         <div class="btn-item">
                            <button class="btn btn-success p-2 btn-newItem"  data-content=" "  title="New item"><i class="fa fa-plus"></i></button>
         </div>
          <div class="btn-item">
                            <button   class="btn btn-success p-2 btn-clipboard"  data-content=" "  title="Paste  from excel"><i class="fa fa-clipboard"></i></button>
         </div>
        </div>
    </th></tr>
    `
    $(`#${this.gridId} thead`).html(trTh);
}
/*
*  Input list events
*
* */
Grid.prototype.inputEvent = function () {
    // copy and paste excel
    document.addEventListener("paste", e => {
        let text = e.clipboardData.getData("text");
        let data = text.split('\n')
        data.forEach((item, index) => {
            if (item.length > 1) {
                let newTr = Object.assign({}, this.dataList[0])
                Object.keys(newTr).forEach((key, index) => {
                    let excelFields = item.split('\t')
                    newTr[key] = index < excelFields.length ?  excelFields[index] :   ' '
                })
                Object.assign(newTr, {duplicate: true})
                this.dataList.push(newTr)
            }
        })
        this.renderList()
    });
    $( '.editable').on('keyDown', function (e) {
        console.log($(this))
    });
    $( '.editable').on('keyUp', function (e) {
        console.log($(this))
    });

}
/*
*  Prepared grid body item
*  @param index integer
*  @param item object
* return table tr tag
* */
Grid.prototype.bodyItem = function (index, item) {
    let tr = `<tr id="tr-${index}" class="${item.duplicate ? 'tr-duplicate' : 'list-item'}"><td class="index">${index + 1}</td>`
    Object.keys(this.tableFields).forEach(key => {
        if (key) {
            tr += `  <td class="is-grid"><input id="${index}|${key}" type='text' class='editable' data-id="${index}" name="${key}" value='${item[key]}'></td>  `
        }
    });
    tr += `<td class="opt">
                    <div class="operation-btn">`
    if (item.duplicate) {
        tr += `<div class="btn-item ">
                            <button class="btn btn-success p-2 btn-save"  data-content="${index}"  title="Save Item"><i class="fa fa-save"></i></button>
                        </div>`
    } else {
        tr += `<div class="btn-item duplicate-btn pl-2 ">
                            <button class="btn btn-info p-2 btn-duplicate"  data-content="${index}"  title="Duplicate Item"><i class="fa fa-copy"></i></button>
                        </div>`
    }
    tr += `   <div class="btn-item remove-btn-yield  pl-2">
                          <button class="btn btn-danger btn-remove p-2" data-content="${index}" title="Remove Item"><i   class="fa fa-trash"></i></button>
                          </div> 
                    </div>
             </td>`
    return tr;
}


window.__grid = new Grid()
__grid.inputEvent()

