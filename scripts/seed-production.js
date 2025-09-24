// Script para executar seed no servidor de produção
const https = require('https');
const http = require('http');

async function seedProduction() {
  const url = process.env.PRODUCTION_URL || 'https://uaiservico-platform.vercel.app';
  const secret = process.env.SEED_SECRET || 'seed-secret-key';
  
  console.log('🚀 Executando seed no servidor de produção...');
  console.log(`📍 URL: ${url}/api/seed`);
  
  const data = JSON.stringify({ secret });
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };
  
  const protocol = url.startsWith('https') ? https : http;
  const urlObj = new URL(url + '/api/seed');
  
  const req = protocol.request(urlObj, options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      try {
        const result = JSON.parse(responseData);
        if (res.statusCode === 200) {
          console.log('✅ Seed executado com sucesso!');
          console.log('👤 Usuários criados:');
          console.log('   Prestadores:', result.users.providers.join(', '));
          console.log('   Clientes:', result.users.clients.join(', '));
          console.log('   Senha padrão:', result.users.password);
        } else {
          console.error('❌ Erro no seed:', result.error);
          if (result.details) {
            console.error('   Detalhes:', result.details);
          }
        }
      } catch (error) {
        console.error('❌ Erro ao processar resposta:', error.message);
        console.log('Resposta recebida:', responseData);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('❌ Erro na requisição:', error.message);
  });
  
  req.write(data);
  req.end();
}

// Executar se chamado diretamente
if (require.main === module) {
  seedProduction();
}

module.exports = seedProduction;
