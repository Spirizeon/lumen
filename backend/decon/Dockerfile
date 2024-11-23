FROM debian:bookworm
EXPOSE 8000
COPY . . 
RUN apt update && apt-get update
RUN apt install vim python3 python3-pip git pkgconf unzip curl -y 
RUN git clone https://github.com/radareorg/radare2
RUN radare2/sys/install.sh
RUN r2pm -U
RUN r2pm -ci r2ghidra r2ghidra-sleigh
RUN pip install -r requirements.txt --break-system-packages
CMD ["uvicorn","main:app","--host","0.0.0.0","--reload"]
