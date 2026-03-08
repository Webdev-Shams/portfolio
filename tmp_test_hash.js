const bcrypt = require('bcryptjs');

const hash = '.3TOxgwHOwDeA1.WoSRMeRFeDQDPXLgJp5ExUxcv8QS'; // The user's hash
const plain = 'admin';

try {
    const result = bcrypt.compareSync(plain, hash);
    console.log('Result for "admin":', result);
} catch (e) {
    console.log('Error comparing "admin":', e.message);
}

const newHash = bcrypt.hashSync('admin', 10);
console.log('Valid hash for "admin":', newHash);
