-- Create subscription plans for providers
INSERT INTO subscriptions (id, name, description, price, duration, features, max_services, max_portfolio_items, priority_support, verified_badge, active) VALUES
('basic-plan', 'Plano Básico', 'Ideal para começar na plataforma', 29.90, 30, ARRAY['Perfil na plataforma', 'Até 3 serviços', 'Suporte por email'], 3, 5, false, false, true),
('professional-plan', 'Plano Profissional', 'Para prestadores estabelecidos', 59.90, 30, ARRAY['Perfil destacado', 'Até 10 serviços', 'Portfólio completo', 'Selo verificado', 'Suporte prioritário'], 10, 20, true, true, true),
('premium-plan', 'Plano Premium', 'Máxima visibilidade e recursos', 99.90, 30, ARRAY['Perfil premium', 'Serviços ilimitados', 'Portfólio ilimitado', 'Selo verificado', 'Suporte 24/7', 'Destaque nas buscas'], NULL, NULL, true, true, true);
