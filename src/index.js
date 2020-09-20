import NodeRSA from 'node-rsa';

(async function () {
  const { greet, rsa_encrypt, rsa_decrypt } = await import('../../wasm-demo/pkg');
  greet();

  const text = 'hello world!'.repeat(10);
  const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxjMeyXYdWt5sYMfI+TQ0
mZXcPRufBFSs6bXpjBuM81oOAS8FknZhucMz91CqYfRZcA7iX+W3bFfabM9fF40S
d5By1VpK6u6Jq70f9GAu36FSbARPueYbKI+gp5ORzLGtL/M8lEVeMHmvu1ZLAyH/
jaXuF+f+IqLDXDT/b+yagCP3/YWBEKpkdrLbLyvS4fLOmRiI/EROYDymYCtQAzqe
dwmuF3XmRixtY5HZK+Hz30y8Wj+H7t0SV2AutSh6O6F46K8fdtYDqzCKzQUQX9OQ
e7zZ+W+EnDVwSX5sGd5ooIf5OJu+Ha60NaVVBQUW7ooL+H/kpjtwec3SwXIhj425
fwIDAQAB
-----END PUBLIC KEY-----`;
  const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGMx7Jdh1a3mxg
x8j5NDSZldw9G58EVKzptemMG4zzWg4BLwWSdmG5wzP3UKph9FlwDuJf5bdsV9ps
z18XjRJ3kHLVWkrq7omrvR/0YC7foVJsBE+55hsoj6Cnk5HMsa0v8zyURV4wea+7
VksDIf+Npe4X5/4iosNcNP9v7JqAI/f9hYEQqmR2stsvK9Lh8s6ZGIj8RE5gPKZg
K1ADOp53Ca4XdeZGLG1jkdkr4fPfTLxaP4fu3RJXYC61KHo7oXjorx921gOrMIrN
BRBf05B7vNn5b4ScNXBJfmwZ3migh/k4m74drrQ1pVUFBRbuigv4f+SmO3B5zdLB
ciGPjbl/AgMBAAECggEBAMPcqMP10TSHMRrC07xQ9tn/2lEZBp/E/ctHVbB7WWLy
z3wj96GxEwn7+VKhiH6cdfXi/5o87HJIrzVwCEzBwEofmRt1yys25x2sG/PnSOr+
BPFxoUfYOWZv6RcxIZfizX7hJDByDI5i8mJy+FX0NxLHsu40+FNJ/T0VsofsjRGq
vKeiKkdY5by5VHDx0jVsMM68DqbaAhl8JDo/g8d/88UzmP5c2JsBqUFRI0AoCqt8
5lXhfOnnHoPPgWSkCfk+zPJVGEFv1tuyfcwuPRNXYayzzamdrCGG9XQvgXa9Rtx2
Iz4SPd2mOApjf1kaNProxvKjP1ro+kGnqtBdtZwpyUECgYEA4YtQ+YInz3E4eJU8
LI4Vg/n089/WmB+z/NqtrM7mDzUCCcHKQrh5dnyBqOS4eliEiqQ9Nebu4+yk7u4m
jNicCEussrE+rz7oysTrTC6kD9PM0MQ24X2JIgZwEfCGhOPfqK38/cXSGvG9j6z+
rSy6T1xDEar8RBOiG9ZCd239xYcCgYEA4PaMz98SWXxRsr1UHiX0cjeeioWWK04H
HSPDLuaWYn3gwN3AKnzBmspPFWC/VqIGyKJbO1wsMP+WHprTQgkBNaob4vd9tuGo
XeV9W0MtTQAUXGKiP9wklgA/7gT7f4Syj7z9KRvntRMpPQhcn6c5zp8jYD8Xb2WU
APJk4KAF6kkCgYEAqXf/yOqGNTVyZBBmHWhJPFglONVYrgcsO3Koiq8PaB/BP0mQ
S1/HTEMzPY9WGf/G31GW+JhjqXjXWPwylSPw4b7SrZXGbvELA8jAsAZfmdDgFYFJ
Z1bnIlzJ+oDK4rFCDcFl1dy9CSfY8krfNYnlF9pQPsdGM3S5Gsd8O7a2tqMCgYAx
4fmvTkN/XDWxcJHqbXgaq4KYLK7zw0WIjJmHGNJX3Jmtqn4l7avwatPGZcGHsD3Y
10drjjCuXL4o4yPdDKocADBWz5IsrzTqPSziw66T2GSrZ6OajXH/YObMHIa36/C8
NqfcKbfjSvBl/CitriL/UgJCITtNFDURUK5VsKYfIQKBgBWZsXzvTLK5aCL3z2OI
F1gY6WhgzWi4BqIQIHPq2jHgPi63H/xq9GTgpopO4vg02xqxexzG4XF69zC1Eqdv
8CKUofSY/CPLQ9sJuQuZogXWn6UyjuwLQN4JJxAEYEJDPd1jaKi2MYtA54j+JKnL
lC5C4KNlOXs9e3s6Mv6n5AgS
-----END PRIVATE KEY-----  
`;

  console.groupCollapsed('Encrypt');
  console.time('[RUST RSA ENC]');
  const encData1 = rsa_encrypt(text, publicKey);
  console.log('Rust encrypt:', encData1);
  console.timeEnd('[RUST RSA ENC]');

  console.time('[NODE RSA ENC]');
  const pub = new NodeRSA(publicKey);
  pub.setOptions({ encryptionScheme: 'pkcs1' });
  const encData2 = pub.encrypt(text, 'base64');
  console.log('Node encrypt:', encData2);
  console.timeEnd('[NODE RSA ENC]');
  console.groupEnd();

  console.groupCollapsed('Decrypt');
  console.time('[RUST RSA DEC]');
  const decData1 = rsa_decrypt(encData1, privateKey);
  console.log('Rust decrypt:', decData1);
  console.timeEnd('[RUST RSA DEC]');

  console.time('[NODE RSA ENC]');
  const pri = new NodeRSA(privateKey);
  pri.setOptions({ encryptionScheme: 'pkcs1' });
  const decData2 = pri.decrypt(encData2, 'utf8');
  console.log('Node decrypt:', decData2);
  console.timeEnd('[NODE RSA ENC]');
  console.groupEnd();
})();
