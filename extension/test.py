import requests

r = requests.get("https://blooming-tor-41068.herokuapp.com/", params={"target_url":"https://www.cnbc.com/2020/02/21/what-happened-to-the-stock-market-friday-virus-fears-resurface-stocks-slide.html"})
print(r.text)
