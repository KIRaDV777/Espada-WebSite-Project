export class PDFGenerator {
  static async generateUserReport(data: any): Promise<Blob> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Rapport Utilisateurs - Espada</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .header { background: #e50914; color: white; padding: 20px; text-align: center; margin-bottom: 30px; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .stat-number { font-size: 2em; font-weight: bold; color: #e50914; }
          .stat-label { color: #666; margin-top: 5px; }
          .table { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .table-header { background: #e50914; color: white; padding: 15px; }
          .table-row { padding: 15px; border-bottom: 1px solid #eee; display: grid; grid-template-columns: 2fr 2fr 1fr 1fr 1fr; gap: 15px; }
          .table-row:last-child { border-bottom: none; }
          .status-active { color: #28a745; font-weight: bold; }
          .status-inactive { color: #dc3545; font-weight: bold; }
          .status-suspended { color: #ffc107; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 Rapport Utilisateurs Espada</h1>
          <p>Généré le ${data.date}</p>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">${data.stats.total}</div>
            <div class="stat-label">Total Utilisateurs</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.active}</div>
            <div class="stat-label">Utilisateurs Actifs</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.premium}</div>
            <div class="stat-label">Comptes Premium</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.avgRevenue}€</div>
            <div class="stat-label">Revenus Moyens</div>
          </div>
        </div>
        
        <div class="table">
          <div class="table-header">
            <h2>Liste des Utilisateurs</h2>
          </div>
          <div class="table-row" style="background: #f8f9fa; font-weight: bold;">
            <div>Nom</div>
            <div>Email</div>
            <div>Statut</div>
            <div>Plan</div>
            <div>Inscription</div>
          </div>
          ${data.users
            .map(
              (user) => `
            <div class="table-row">
              <div>${user.name}</div>
              <div>${user.email}</div>
              <div class="status-${user.status}">${user.status}</div>
              <div>${user.plan}</div>
              <div>${user.createdAt}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </body>
      </html>
    `

    return new Blob([html], { type: "text/html" })
  }

  static async generateModeratorReport(data: any): Promise<Blob> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Rapport Modérateurs - Espada</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .header { background: #e50914; color: white; padding: 20px; text-align: center; margin-bottom: 30px; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .stat-number { font-size: 2em; font-weight: bold; color: #e50914; }
          .stat-label { color: #666; margin-top: 5px; }
          .table { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .table-header { background: #e50914; color: white; padding: 15px; }
          .table-row { padding: 15px; border-bottom: 1px solid #eee; display: grid; grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr; gap: 15px; }
          .table-row:last-child { border-bottom: none; }
          .performance-good { color: #28a745; font-weight: bold; }
          .performance-average { color: #ffc107; font-weight: bold; }
          .performance-poor { color: #dc3545; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>👥 Rapport Modérateurs Espada</h1>
          <p>Généré le ${data.date}</p>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">${data.stats.total}</div>
            <div class="stat-label">Total Modérateurs</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.active}</div>
            <div class="stat-label">Modérateurs Actifs</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.avgSatisfaction}%</div>
            <div class="stat-label">Satisfaction Moyenne</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.totalTickets}</div>
            <div class="stat-label">Tickets Résolus</div>
          </div>
        </div>
        
        <div class="table">
          <div class="table-header">
            <h2>Performance des Modérateurs</h2>
          </div>
          <div class="table-row" style="background: #f8f9fa; font-weight: bold;">
            <div>Nom</div>
            <div>Email</div>
            <div>Spécialisation</div>
            <div>Tickets</div>
            <div>Satisfaction</div>
            <div>Temps Réponse</div>
          </div>
          ${data.moderators
            .map(
              (mod) => `
            <div class="table-row">
              <div>${mod.name}</div>
              <div>${mod.email}</div>
              <div>${mod.specialization}</div>
              <div>${mod.ticketsResolved}</div>
              <div class="performance-${mod.satisfaction >= 90 ? "good" : mod.satisfaction >= 70 ? "average" : "poor"}">${mod.satisfaction}%</div>
              <div>${mod.responseTime}h</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </body>
      </html>
    `

    return new Blob([html], { type: "text/html" })
  }

  static async generateApplicationReport(data: any): Promise<Blob> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Rapport Applications - Espada</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .header { background: #e50914; color: white; padding: 20px; text-align: center; margin-bottom: 30px; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .stat-number { font-size: 2em; font-weight: bold; color: #e50914; }
          .stat-label { color: #666; margin-top: 5px; }
          .table { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .table-header { background: #e50914; color: white; padding: 15px; }
          .table-row { padding: 15px; border-bottom: 1px solid #eee; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr; gap: 15px; }
          .table-row:last-child { border-bottom: none; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📱 Rapport Applications Espada</h1>
          <p>Généré le ${data.date}</p>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">${data.stats.total}</div>
            <div class="stat-label">Total Applications</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.active}</div>
            <div class="stat-label">Applications Actives</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.totalDownloads}</div>
            <div class="stat-label">Téléchargements</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.totalRevenue}€</div>
            <div class="stat-label">Revenus Totaux</div>
          </div>
        </div>
        
        <div class="table">
          <div class="table-header">
            <h2>Performance des Applications</h2>
          </div>
          <div class="table-row" style="background: #f8f9fa; font-weight: bold;">
            <div>Application</div>
            <div>Catégorie</div>
            <div>Version</div>
            <div>Téléchargements</div>
            <div>Utilisateurs</div>
            <div>Revenus</div>
          </div>
          ${data.applications
            .map(
              (app) => `
            <div class="table-row">
              <div>${app.name}</div>
              <div>${app.category}</div>
              <div>${app.version}</div>
              <div>${app.downloads}</div>
              <div>${app.activeUsers}</div>
              <div>${app.revenue}€</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </body>
      </html>
    `

    return new Blob([html], { type: "text/html" })
  }

  static async generatePricingReport(data: any): Promise<Blob> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Rapport Tarifs - Espada</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .header { background: #e50914; color: white; padding: 20px; text-align: center; margin-bottom: 30px; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .stat-number { font-size: 2em; font-weight: bold; color: #e50914; }
          .stat-label { color: #666; margin-top: 5px; }
          .table { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .table-header { background: #e50914; color: white; padding: 15px; }
          .table-row { padding: 15px; border-bottom: 1px solid #eee; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr; gap: 15px; }
          .table-row:last-child { border-bottom: none; }
          .status-active { color: #28a745; font-weight: bold; }
          .status-inactive { color: #dc3545; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>💰 Rapport Tarifs Espada</h1>
          <p>Généré le ${data.date}</p>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">${data.stats.totalPlans}</div>
            <div class="stat-label">Plans Tarifaires</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.activePlans}</div>
            <div class="stat-label">Plans Actifs</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.totalSubscribers}</div>
            <div class="stat-label">Total Abonnés</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.totalRevenue}€</div>
            <div class="stat-label">Revenus Totaux</div>
          </div>
        </div>
        
        <div class="table">
          <div class="table-header">
            <h2>Performance des Plans Tarifaires</h2>
          </div>
          <div class="table-row" style="background: #f8f9fa; font-weight: bold;">
            <div>Plan</div>
            <div>Prix</div>
            <div>Facturation</div>
            <div>Abonnés</div>
            <div>Revenus</div>
            <div>Statut</div>
          </div>
          ${data.plans
            .map(
              (plan) => `
            <div class="table-row">
              <div>${plan.name}</div>
              <div>${plan.price}€</div>
              <div>${plan.billing}</div>
              <div>${plan.subscribers}</div>
              <div>${plan.revenue}€</div>
              <div class="status-${plan.isActive ? "active" : "inactive"}">${plan.isActive ? "Actif" : "Inactif"}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </body>
      </html>
    `

    return new Blob([html], { type: "text/html" })
  }

  static async generateServiceReport(data: any): Promise<Blob> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Rapport Services - Espada</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .header { background: #e50914; color: white; padding: 20px; text-align: center; margin-bottom: 30px; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .stat-number { font-size: 2em; font-weight: bold; color: #e50914; }
          .stat-label { color: #666; margin-top: 5px; }
          .table { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .table-header { background: #e50914; color: white; padding: 15px; }
          .table-row { padding: 15px; border-bottom: 1px solid #eee; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 15px; }
          .table-row:last-child { border-bottom: none; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>⚙️ Rapport Services Espada</h1>
          <p>Généré le ${data.date}</p>
        </div>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-number">${data.stats.total}</div>
            <div class="stat-label">Total Services</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.active}</div>
            <div class="stat-label">Services Actifs</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.avgUptime}%</div>
            <div class="stat-label">Disponibilité Moyenne</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${data.stats.maintenance}</div>
            <div class="stat-label">En Maintenance</div>
          </div>
        </div>
        
        <div class="table">
          <div class="table-header">
            <h2>État des Services</h2>
          </div>
          <div class="table-row" style="background: #f8f9fa; font-weight: bold;">
            <div>Service</div>
            <div>Statut</div>
            <div>Disponibilité</div>
            <div>Temps Réponse</div>
            <div>Dernière Vérification</div>
          </div>
          ${data.services
            .map(
              (service) => `
            <div class="table-row">
              <div>${service.name}</div>
              <div>${service.status}</div>
              <div>${service.uptime}%</div>
              <div>${service.responseTime}ms</div>
              <div>${service.lastCheck}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </body>
      </html>
    `

    return new Blob([html], { type: "text/html" })
  }

  static async downloadPDF(blob: Blob, filename: string): Promise<void> {
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}
