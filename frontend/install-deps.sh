#!/bin/sh

# Filtra comentários e linhas vazias, depois instala os pacotes
grep -v "^#" requirements.txt | grep -v "^$" | tr '\n' ' ' | xargs npm install