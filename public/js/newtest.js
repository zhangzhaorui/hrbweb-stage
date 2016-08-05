//$(function(){
    function selOrrepo(selOrItem,pages){

        if(selOrItem == 'item'){
            alert('item');
            var itemjson = {
                itemfornum : 0,
                itemarr : []
            }
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                url: "api/repositories/Internet_stats?items=1&size=6&page=" + pages,
                success: function (msg) {
                    allitemnums = msg.data.items;
                    itemjson.itemfornum = msg.data.dataitems.length;
                    itemjson.itemarr = msg.data.dataitems;
                    return itemjson;
                }
            });
            return itemjson;
        }else if(selOrItem == 'select'){
            alert('select');
            var selectjson = {
                itemfornum : 0,
                itemarr : []
            }
            $.ajax({
                type: "get",
                async: false,
                cache: false,
                url: "api/selects?select_labels"+"&size=10&page="+pages,
                success: function (msg) {
                    allitemnums = msg.data.total;
                    selectjson.itemfornum = msg.data.select.length;
                    selectjson.itemarr = msg.data.select;
                    return selectjson;
                }
            });
            return selectjson;
        }
    }
//})