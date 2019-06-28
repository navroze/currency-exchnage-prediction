/* eslint-disable */
$(document).ready(() => {
  $('#notification').hide();
  $('#danger-notification').hide();
});

document.forms.exchangeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  /**
 * Validation and send get request logic
 */
  $('#notification').hide();
  $('#danger-notification').hide();
  if ($('#base-currency').val() === $('#target-currency').val())
  {
    $('#danger-notification').show();
    return;
  }

  const params = {};
  $.each($('#exchangeForm').serializeArray(), (i, field) => {
    params[field.name] = field.value;
  });

  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)  }=${  encodeURIComponent(params[k])}`)
    .join('&');

  // Send GET request
  const url = 'http://localhost:3000/currency?' + query;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const targetCurrency = $('#target-currency').val();
      const baseCurrency = $('#base-currency').val();
      let totalCapital = parseFloat(data.rate) * parseFloat($('#amount').val());
      totalCapital = totalCapital.toFixed(2);
      const prediction = `The best time to sell your ${baseCurrency} is ${data.date} at the rate of ${data.rate} ${targetCurrency}.
        Your total capital would be ${totalCapital} ${baseCurrency}`;
      $('#notification').toggle();
      $('#notification-text').text(prediction);
    })
    .catch(error => console.log(error));
});
