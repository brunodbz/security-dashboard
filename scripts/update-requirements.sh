#!/bin/bash

# Atualiza requirements.txt do backend
echo "Atualizando requirements.txt do backend..."
cd backend
npm list --depth=0 --json | jq -r '.dependencies | to_entries[] | "\(.key)@\(.value)"' > ../requirements-backend.txt
cd ..

# Atualiza requirements.txt do frontend
echo "Atualizando requirements.txt do frontend..."
cd frontend
npm list --depth=0 --json | jq -r '.dependencies | to_entries[] | "\(.key)@\(.value)"' > ../requirements-frontend.txt
cd ..

echo "Arquivos requirements.txt atualizados com sucesso!"