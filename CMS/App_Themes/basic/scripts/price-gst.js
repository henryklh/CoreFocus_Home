  function pageLoad() {
    
    function isNumber(e) {
      return !isNaN(parseFloat(e)) && isFinite(e);
    }
    
    
    
    if (document.getElementById('field_SKUPriceIncTax') != undefined) {
      var pSKUTax = document.getElementById('field_SKUPriceIncTax').getElementsByClassName('form-control')[0];
      var pSKU = document.getElementById('field_SKUPrice').getElementsByClassName('form-control')[0];
      
      // load from price field
      if (pSKUTax.value == '' && pSKU.value.length > 0) {
        if (isNumber(pSKU.value))
          pSKUTax.value = parseFloat(pSKU.value) * 1.1; // inc GST = (1 + 10%);
        else
          pSKUTax.value = '';
      }
      
      // when key up at price tax field
      pSKUTax.onkeyup = function () {
        if (isNumber(pSKUTax.value))
          pSKU.value = parseFloat(pSKUTax.value) / 1.1; // inc GST = (1 + 10%);
        else
          pSKU.value = '';
      };
      
      // when key up at price field
      pSKU.onkeyup = function () {
        if (isNumber(pSKU.value))
          pSKUTax.value = parseFloat(pSKU.value) * 1.1; // inc GST = (1 + 10%);
        else
          pSKUTax.value = '';
      };
      
    }
    
    if (document.getElementById('field_SKURetailPriceIncTax') != undefined) {
      var pRRPTax = document.getElementById('field_SKURetailPriceIncTax').getElementsByClassName('form-control')[0];
      var pRRP = document.getElementById('field_SKURetailPrice').getElementsByClassName('form-control')[0];
      
      // load from Retail field
      if (pRRPTax.value == '' && pRRP.value.length > 0) {
        if (isNumber(pRRP.value))
          pRRPTax.value = parseFloat(pRRP.value) * 1.1; // inc GST = (1 + 10%);
        else
          pRRPTax.value = '';
      }
      
      // when key up at Retail tax field
      pRRPTax.onkeyup = function () {
        if (isNumber(pRRPTax.value))
          pRRP.value = parseFloat(pRRPTax.value) / 1.1; // inc GST = (1 + 10%);
        else
          pRRP.value = '';
      };
      
      // when key up at Retail field
      pRRP.onkeyup = function () {
        if (isNumber(pRRP.value))
          pRRPTax.value = parseFloat(pRRP.value) * 1.1; // inc GST = (1 + 10%);
        else
          pRRPTax.value = '';
      };
      
    }
    
  }
