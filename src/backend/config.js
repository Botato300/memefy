import assert from "assert/strict";

const ENV_VARS = {
    IP: process.env.IP,
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV
};

for (const key in ENV_VARS) {
    assert.ok(ENV_VARS[key], `${key} does not exist or contains an invalid value`);
}

export { ENV_VARS };