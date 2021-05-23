var functions = {
    init: function() {
        console.log('init got called inside functions.js')
        this.someOtherfunction();
    },
    someOtherfunction: function() {
        console.log('hello my name is some other function and I just got called')
    },
    initPickerClicker: function(picker) {
      
        //let ext_scroll = this.windowScrollHandler;

        let optionClickEvent = this.optionClickEvent;

        console.log('optionclickevent: ' + optionClickEvent);
  
        //let yearCol = this.yearColScrollClickHandler;

        var pickerToInit = document.getElementById(picker);
        console.log(pickerToInit);    
        var options = pickerToInit.getElementsByTagName("li");
        var arrow_buttons = pickerToInit.getElementsByClassName('picker-cell__control');
    
        // Custom scroll listener for year column
        for (let option of options) {
          option.onmouseover = function() {
            this.mouse = true;
          };
          option.onmouseout = function() {
            this.mouse = false;
          };
          let section = option.getAttribute('data-name');
            // Year column scroll event
          option.onwheel = function(event) {
            console.log('you are scrolling on the div')
            if (Number(event.deltaY) > 0) {
              dir = false;
            } else {
              dir = true;
            }
            yearCol(options, dir, section);
          };
          option.onclick = this.optionClickEvent(options);
        }
        for (var i = 0; i < 2; i++) {
          // The top button is identical to scrolling up
          if (i == 0) {
            var dir = true;
          } else {
            var dir = false;
          }
          arrow_buttons[i].onclick = function() {
            yearCol(options, dir, 'year');
          }
        }
        /*pickerToInit.onmouseover = function() {
          this.mouse = true;
          // Abort if scrolling when enter goes here
        };
        pickerToInit.onmouseout = function() {
          this.mouse = false;
        };*/
        // TODO - scrolling resets values set by clicking on other columns
        // I believe this has something to do with how PickerJS refreshes as it usually resets to current date
    },
    optionClickEvent: function(options) {
        let calcNewNum = this.calcNewValue;
        for (let option of options) {
          if (option.mouse) {
            var hovered_value = option.innerHTML;
            var hovered_section = option.getAttribute('data-name');
          }
        }
        for (let option of options) {
          let style = option.getAttribute('class');
          let section = option.getAttribute('data-name')
          if (section == hovered_section && style == 'picker-item picker-picked') {
            var selected_value = option.innerHTML;
          }
        }
  
        var old_days = []
        for (let option of options) {
          var section = option.getAttribute('data-name');
          if (section == hovered_section) {
            console.log('hov', hovered_value);
            console.log('sel', selected_value);
            var new_value = calcNewNum(section, hovered_value, selected_value, option.innerHTML)
            if (new_value < 10 && new_value > -1) {
              new_value = '0' + String(new_value)
            }
            option.innerHTML = String(new_value)
            option.setAttribute('data-value', String(new_value))
          }
          if (hovered_section == 'month' && section == 'day' || (hovered_section == 'year' && section == 'day') || hovered_section == 'day') {
            old_days.push(option.innerHTML);
          }
        }
        if (hovered_section == 'year' || hovered_section == 'month') {
          updateDays(old_days, options);
        }
    },
    calcNewValue: function(section, hov, sel, val3) {
        //console.log(section)
        var val3 = Number(val3)
        var max = 0
        if (section == 'minute') {
          max = 59
        } 
        if (section == 'hour') {
          max = 23
        }  
        if (section == 'day') {
          // make this days in selected month
          var today = new Date();
          let daysInSelectedMonth = this.daysInSelectedMonth;
          if (daysInSelectedMonth != null) {
            max = daysInSelectedMonth;
            console.log('days in this month: ' + max);
          } else {
            max = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            console.log('days in this month: ' + max);
          }
          max -= 1
        }
        if (section == 'month') {
          max = 11
        }
        if (section == 'year') {
          max = this.max_year;
          var min = this.min_year;
          //alert(max)
        }
        var new_num = 0
        // hov is the one with the cursor over if
        var offset = (Number(hov) - Number(sel)) 
        if (offset < -2) {
          offset += (max + 1)
        }
        if (offset > 2) {
          offset -= (max + 1)
        }
  
        // offset is -4 when selected is 2023 and picked is 2018
        console.log('offset: ' + offset)
        
        new_num = val3 + offset
        console.log('new num: ' + new_num)
  
        if (new_num > max && max != 0) {
          new_num = (new_num % max) - 1
        } 
        if (new_num < 0) {
          new_num += (max + 1)
        }
        // TODO - make this have a max span of 5 years
        if (section == 'year') {
          var fix = this.fix_const
          if (offset < -2 && offset > -min) {
            //alert('called' + offset)
            if (new_num < 10) {
              new_num += (min + 1)
              console.log('this')
              return new_num
            }
            new_num -= fix
          }
          if (offset < -min) {
            if (new_num < 20) {
              new_num += min - fix
              //console.log('this')
            }
            if (new_num < 1500) {
              new_num += 1000 + Math.floor(fix / 2)
              //console.log('that')
            }
            if (new_num < min) {
              new_num += fix
              //console.log('i was totally wrong')
            }
            console.log('called')
          }
          // If we've gone past max (2023) loop back around to min
          if (new_num < 10) {
            new_num += min
          }
          // If we've gone past min (2018) loop back around to max
          if (new_num < min) {
            //fix = 6
            new_num += fix
          }
          // going from 2022 to 2023 (downwards) goes back to 2021
          /*if (offset == 1) {
            alert('stuff')
          }*/
          // Correct numbers out of range
          if (new_num > max) {
            new_num -= fix
          } 
        } 
        if (section == 'month' && new_num == 0) {
          new_num = 12
        }
        if (section == 'day' && new_num == 0) {
          new_num = (max + 1)
        }
        if (section == 'year' && new_num < min) {
          new_num += fix
        }
  
        return new_num
    }
}
export default functions;