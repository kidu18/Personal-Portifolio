const dns = require("dns");

// Force Google DNS
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  console.log("DNS servers set to Google DNS (8.8.8.8)");
} catch (e) {
  console.error("Failed to set DNS servers:", e);
}

const domain = "cluster0.p7skz.mongodb.net";
const srvDomain = "_mongodb._tcp." + domain;

console.log(`Resolving SRV for ${srvDomain}...`);

dns.resolveSrv(srvDomain, (err, addresses) => {
  if (err) {
    console.error("SRV Lookup Failed:", err);

    // Try A record fallback
    console.log(`Trying A record lookup for ${domain}...`);
    dns.resolve4(domain, (err2, addresses2) => {
      if (err2) {
        console.error("A Lookup Failed:", err2);
      } else {
        console.log("A Lookup Successful:", addresses2);
      }
    });
  } else {
    console.log("SRV Lookup Successful:", addresses);
  }
});
