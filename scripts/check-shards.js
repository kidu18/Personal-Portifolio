const dns = require("dns");

// Try with and without Google DNS
const testDomains = [
  "cluster0-shard-00-00.p7skz.mongodb.net",
  "cluster0-shard-00-01.p7skz.mongodb.net",
  "cluster0-shard-00-02.p7skz.mongodb.net",
];

async function resolveDomain(domain, useGoogle) {
  if (useGoogle) {
    try {
      dns.setServers(["8.8.8.8"]);
    } catch (e) {}
  } else {
    // Reset to default (try) - Node doesn't have a clear reset,
    // but this script runs fresh each time.
  }

  return new Promise((resolve) => {
    dns.resolve4(domain, (err, addresses) => {
      if (err)
        resolve({
          domain,
          error: err.code,
          dns: useGoogle ? "Google" : "System",
        });
      else resolve({ domain, addresses, dns: useGoogle ? "Google" : "System" });
    });
  });
}

async function run() {
  console.log("--- Testing System DNS ---");
  for (const d of testDomains) {
    console.log(await resolveDomain(d, false));
  }

  console.log("\n--- Testing Google DNS (8.8.8.8) ---");
  for (const d of testDomains) {
    console.log(await resolveDomain(d, true));
  }
}

run();
