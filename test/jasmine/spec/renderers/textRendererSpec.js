describe('TextRenderer', function () {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $('<div id="' + id + '"></div>').appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  it('should render string', function () {
    handsontable();
    setDataAtCell(2, 2, "string");

    expect(getCell(2, 2).innerHTML).toEqual("string");
  });

  it('should render number', function () {
    handsontable();
    setDataAtCell(2, 2, 13);

    expect(getCell(2, 2).innerHTML).toEqual("13");
  });

  it('should render boolean true', function () {
    handsontable();
    setDataAtCell(2, 2, true);

    expect(getCell(2, 2).innerHTML).toEqual("true");
  });

  it('should render boolean false', function () {
    handsontable();
    setDataAtCell(2, 2, false);

    expect(getCell(2, 2).innerHTML).toEqual("false");
  });

  it('should render null', function () {
    handsontable();
    setDataAtCell(2, 2, null);

    expect(getCell(2, 2).innerHTML).toEqual("");
  });

  it('should render undefined', function () {
    handsontable();
    setDataAtCell(2, 2, (function () {
    })());

    expect(getCell(2, 2).innerHTML).toEqual("");
  });

  it('should add class name `dimmed` to a read only cell', function () {
    var DIV = document.createElement('DIV');
    var instance = new Handsontable.Core($(DIV), {});
    instance.init(); //unfortunately these 3 lines are currently needed to satisfy renderer arguments (as of v0.8.21)

    var TD = document.createElement('TD');
    Handsontable.TextRenderer(instance, TD, 0, 0, 0, '', {readOnly: true});
    expect(TD.className).toEqual('htDimmed');
  });

  it('should add class name `htInvalid` to an cell that does not validate', function () {
    handsontable({
      validator: function (value, callb) {
        if (value == "A1") {
          callb(false)
        }
        else {
          callb(true)
        }
      }
    });

    handsontable({
      data: createSpreadsheetData(2, 2)
    });

    expect(this.$container.find('td.htInvalid').length).toEqual(1);
    expect(this.$container.find('td:not(.htInvalid)').length).toEqual(3);
  });
});