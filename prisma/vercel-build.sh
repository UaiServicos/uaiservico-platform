#!/bin/bash

# Script para build no Vercel
echo "🔧 Configurando Prisma para Vercel..."

# Gerar o Prisma Client
echo "📦 Gerando Prisma Client..."
npx prisma generate

# Verificar se foi gerado corretamente
if [ -d "node_modules/.prisma" ]; then
  echo "✅ Prisma Client gerado com sucesso!"
else
  echo "❌ Erro ao gerar Prisma Client"
  exit 1
fi

echo "🚀 Build do Prisma concluído!"
