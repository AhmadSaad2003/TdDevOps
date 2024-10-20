const http = require('http');
const si = require('systeminformation');

const PORT = 8000;

// Fonction pour obtenir les informations sur le CPU
export const getCpuInfo = async () => {
    const cpu = await si.cpu();
    return {
        model: `${cpu.manufacturer} ${cpu.brand}`,
        cores: cpu.cores,
        speed: cpu.speed
    };
};

// Fonction pour obtenir les informations sur la mémoire
export const getMemoryInfo = async () => {
    const memory = await si.mem();
    return {
        total: memory.total / (1024 ** 3), // Convertir en Go
        used: memory.used / (1024 ** 3) // Convertir en Go
    };
};

// Fonction pour construire la réponse JSON
export const buildResponse = async () => {
    try {
        const cpuInfo = await getCpuInfo();
        const memoryInfo = await getMemoryInfo();
        
        return {
            cpu: cpuInfo,
            memory: memoryInfo
        };
    } catch (error) {
        throw new Error('Erreur lors de la récupération des informations système');
    }
};

// Fonction pour gérer les requêtes
export const requestHandler = async (req, res) => {
    if (req.url === '/api/v1/sysinfo' && req.method === 'GET') {
        try {
            const response = await buildResponse();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route non trouvée' }));
    }
};

// Création du serveur
export const server = http.createServer(requestHandler);

// Démarrer le serveur
if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Serveur en écoute sur http://localhost:${PORT}`);
    });
}
