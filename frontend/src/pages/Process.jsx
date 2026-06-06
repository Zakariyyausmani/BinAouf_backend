import React from 'react';

const Process = () => {
  return (
    <div>
      {/* Process Banner */}
      <section className="process-banner">
        <div className="tag">Production Process</div>
        <h1 className="sec-title">
          From Ancient Caves<br />
          <em>To Safe Delivery</em>
        </h1>
        <p>
          We maintain strict sanitary controls from extraction to packaging, preserving the pure crystalline integrity of Himalayan salt.
        </p>
      </section>

      {/* 5-Step Process Section */}
      <section className="proc-steps-sec">
        <div style={{ textAlign: 'center' }} className="reveal visible">
          <div className="tag center">Workflow Steps</div>
          <h2 className="sec-title">The 5-Step Quality Path</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '500px', margin: '12px auto 0', fontWeight: '300' }}>
            We monitor each milestone of the production flow.
          </p>
        </div>

        <div className="proc-steps-grid">
          {/* Step 1 */}
          <div className="proc-step">
            <div className="proc-num">01</div>
            <span className="proc-step-icon">⛏️</span>
            <h4 className="proc-step-title">Ethical Extraction</h4>
            <p className="proc-step-desc">
              Himalayan salt crystals are hand-extracted by experienced miners using traditional methods to protect structural integrity.
            </p>
          </div>

          {/* Step 2 */}
          <div className="proc-step">
            <div className="proc-num">02</div>
            <span className="proc-step-icon">🔍</span>
            <h4 className="proc-step-title">Strict Sorting</h4>
            <p className="proc-step-desc">
              Raw rocks are hand-sorted. We select optimal pink and white crystal categories, removing impurities and grey layers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="proc-step">
            <div className="proc-num">03</div>
            <span className="proc-step-icon">🚿</span>
            <h4 className="proc-step-title">Washing & Crushing</h4>
            <p className="proc-step-desc">
              Selected blocks are washed with high-pressure pure brine water, air-dried, and crushed to specified grain levels.
            </p>
          </div>

          {/* Step 4 */}
          <div className="proc-step">
            <div className="proc-num">04</div>
            <span className="proc-step-icon">🔬</span>
            <h4 className="proc-step-title">Lab Testing</h4>
            <p className="proc-step-desc">
              Chemical verification checks mineral components, NaCl concentrations, and confirms complete absence of moisture.
            </p>
          </div>

          {/* Step 5 */}
          <div className="proc-step">
            <div className="proc-num">05</div>
            <span className="proc-step-icon">📦</span>
            <h4 className="proc-step-title">Custom Packaging</h4>
            <p className="proc-step-desc">
              Products are packaged in moisture-controlled environments into branded retail bags or double-wall bulk containers.
            </p>
          </div>
        </div>
      </section>

      {/* Process Details cards */}
      <section className="proc-detail-sec">
        <div className="proc-detail-grid">
          <div className="pdc">
            <span className="pdc-big">01</span>
            <span className="pdc-icon">🎨</span>
            <h4 className="pdc-title">Meticulous Color Sorting</h4>
            <p className="pdc-desc">
              Himalayan salt exhibits shades of red, dark pink, light pink, and white. We grade color ranges meticulously to ensure aesthetic uniformity in your retail bags.
            </p>
            <ul className="pdc-list">
              <li>Premium Dark Pink: High iron trace elements</li>
              <li>Light Pink: Standard kitchen grade</li>
              <li>Pure White: High translucency for bath & tiles</li>
            </ul>
          </div>

          <div className="pdc">
            <span className="pdc-big">02</span>
            <span className="pdc-icon">🏭</span>
            <h4 className="pdc-title">Stainless Steel Milling</h4>
            <p className="pdc-desc">
              Our crushing equipment uses food-grade 304 stainless steel teeth. This prevents metal dust contamination during rock grinding, guaranteeing maximum purity.
            </p>
            <ul className="pdc-list">
              <li>High-capacity coarse grinders</li>
              <li>Precision fine powder mills</li>
              <li>Sieve separators for uniform sorting</li>
            </ul>
          </div>

          <div className="pdc">
            <span className="pdc-big">03</span>
            <span className="pdc-icon">🚢</span>
            <h4 className="pdc-title">Climate-Controlled Packing</h4>
            <p className="pdc-desc">
              Salt is highly hygroscopic (absorbs moisture from the air). Our packaging lines use dehumidified air chambers to seal pouches and bulk drums.
            </p>
            <ul className="pdc-list">
              <li>Heavy desiccant bags in containers</li>
              <li>Sealed shrink wraps for cargo pallets</li>
              <li>Double-wall corrugated shipping boxes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="quality-sec">
        <div className="quality-inner">
          <div className="quality-visual">
            <span className="q-big-icon">🛡️</span>
            <h3>Certified Quality Assurance</h3>
            <p>
              We operate under ISO 22000 hygiene rules and keep full traceability records for all export batches.
            </p>
            <div className="q-checks">
              <div className="qc">
                <span className="qc-icon">✓</span>
                <span className="qc-text">Minimum NaCl concentration of 98.2% verified by lab chromatography.</span>
              </div>
              <div className="qc">
                <span className="qc-icon">✓</span>
                <span className="qc-text">Zero chemical anti-caking agents, synthetic flow additives, or bleaches.</span>
              </div>
              <div className="qc">
                <span className="qc-icon">✓</span>
                <span className="qc-text">Geological tracking: batch traces back to specific Warcha/Khewra mine nodes.</span>
              </div>
            </div>
          </div>

          <div>
            <div className="tag">QA Checkpoints</div>
            <h2 className="sec-title" style={{ fontSize: '28px', marginBottom: '20px' }}>
              How We Guarantee<br />
              <em>Export Standards</em>
            </h2>
            
            <div className="quality-steps">
              <div className="qs">
                <div className="qs-num">1</div>
                <div className="qs-content">
                  <h5>Mine Node Validation</h5>
                  <p>Only mine veins yielding high-density rock crystals are selected. We bypass nodes with grey salt streaks or clay inclusions.</p>
                </div>
              </div>
              <div className="qs">
                <div className="qs-num">2</div>
                <div className="qs-content">
                  <h5>Pure Brine Wash</h5>
                  <p>Unlike others who wash salt with river water, we use saturated, high-purity salt brine. This cleans dust without dissolving the crystal facets.</p>
                </div>
              </div>
              <div className="qs">
                <div className="qs-num">3</div>
                <div className="qs-content">
                  <h5>Metal Detection Screen</h5>
                  <p>Before packing, granular salts pass through high-frequency magnetic separators to guarantee complete absence of metallic residues.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;
