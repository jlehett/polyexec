const fs = require('fs');

exports.get = () => {
    const guiConfigPath = process.env.GUI_CONFIG_PATH;

    if (guiConfigPath) {
        if (!fs.existsSync(guiConfigPath)) {
            createDefaultConfig();
        }
        
        return JSON.parse(fs.readFileSync(guiConfigPath, 'utf8'));
    }

    return null;
}

function createDefaultConfig() {
    const guiConfigPath = process.env.GUI_CONFIG_PATH;

    const defaultConfig = {
        width: 800,
        height: 600,
    };

    if (guiConfigPath) {
        fs.writeFileSync(guiConfigPath, JSON.stringify(defaultConfig, null, 2));
    }
}