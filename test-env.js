// Script para testar se as variáveis de ambiente estão sendo lidas
require('dotenv').config()

console.log('🔍 Testando leitura do arquivo .env:')
console.log('=====================================')

console.log('SMTP_SERVICE:', process.env.SMTP_SERVICE || 'não definido')
console.log('SMTP_USER:', process.env.SMTP_USER || 'não definido')
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***configurado***' : 'não definido')
console.log('SMTP_FROM:', process.env.SMTP_FROM || 'não definido')
console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL || 'não definido')

console.log('\n📊 Status:')
console.log('- SMTP_USER definido:', !!process.env.SMTP_USER)
console.log('- SMTP_PASS definido:', !!process.env.SMTP_PASS)
console.log('- Configuração completa:', !!(process.env.SMTP_USER && process.env.SMTP_PASS))

if (process.env.SMTP_USER && process.env.SMTP_PASS) {
  console.log('\n✅ Configuração de email encontrada!')
} else {
  console.log('\n⚠️ Configuração de email incompleta!')
  console.log('Verifique se o arquivo .env existe e tem as variáveis corretas.')
}
