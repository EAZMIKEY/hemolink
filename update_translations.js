const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/messages');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(dir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (data.navbar) {
      if (file === 'en.json') {
        data.navbar.stateDelhi = "State: Delhi";
        data.navbar.districtCentral = "District: Central";
      } else {
        // Just rename the keys and keep original if available, or fallback
        if (data.navbar.stateDl) {
          data.navbar.stateDelhi = data.navbar.stateDl.replace('DL', 'Delhi');
        } else {
          data.navbar.stateDelhi = "State: Delhi";
        }
        
        if (data.navbar.stateMh) {
          data.navbar.districtCentral = "District: Central"; // Hardcode just to be safe it matches the EN value structure
        } else {
          data.navbar.districtCentral = "District: Central";
        }
      }

      delete data.navbar.stateDl;
      delete data.navbar.stateMh;
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  }
});
console.log('Translations updated successfully');
