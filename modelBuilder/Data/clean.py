f = open("clickbait_data.txt")
f2 = open("non_clickbait_data.txt")

out = open("data.txt", "w")

data = f.readline()
while(data):
    if(data.strip() != "" and not data.strip() in ['\n', '\r\n']):
        out.write(data.strip().replace("`", "") + "`1\n")
    data = f.readline()

data = f2.readline()
while(data):
    if(data.strip() != "" and not data.strip() in ['\n', '\r\n']):
        out.write(data.strip().replace("`", "") + "`0\n")
    data = f2.readline()