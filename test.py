import sys
import json
import requests
import pandas as pd
from statsmodels.tsa.holtwinters import Holt
import numpy as np

try:
    if (len(sys.argv) > 2): 
            base_currency = sys.argv[1]
            target_currency = sys.argv[2]
            start_date = sys.argv[3]
            end_date = sys.argv[4]
            waiting_time = int(sys.argv[5], 10)

    url = 'https://api.exchangeratesapi.io/history?start_at={}&end_at={}&symbols={}&base={}'.format(start_date, end_date, target_currency, base_currency)
    response = requests.get(url)
    result = response.json()
    rates = result['rates']
    dates = []
    exchange_rate = []
    for rate in rates:
        dates.append(rate)
        exchange_rate.append(rates[rate][target_currency])
    exchange_dates = pd.to_datetime(dates)
    df = pd.DataFrame(index=exchange_dates, data=exchange_rate, columns=['rates'])
    df = df.fillna(0)
    df = df.resample('B').asfreq()
    df = df.fillna(0)
    fit_model = Holt(df['rates']).fit(smoothing_level=0.8, smoothing_slope = 0.1, optimized=False)
    fo = fit_model.forecast(5)
    test_predictions = fit_model.forecast(7*waiting_time)
    prediction_rate = test_predictions.max()
    prediction_date = test_predictions.idxmax()
    prediction_date = prediction_date.date().strftime('%Y-%m-%d')
    response = {
        'date': prediction_date,
        'rate': prediction_rate
    }
    response = json.dumps(response)
    print(response)
    sys.stdout.flush()
except Exception as error:
    error = {
        'error': 'Something went wrong with the predication'
    }
    response = json.dumps(error)
    print(response)
    sys.stdout.flush()