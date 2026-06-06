import React from 'react';

const AboutUs = () => {
  return (
    <div>
      {/* About Banner */}
      <section className="about-banner">
        <div className="tag">About Bin Aouf</div>
        <h1 className="sec-title">
          Earning Global Trust<br />
          <em>Through Pure Quality</em>
        </h1>
        <p>
          Founded in Khushab, Punjab, Pakistan, Bin Aouf has grown from a local mining affiliate into a premium exporter of authentic Himalayan pink salt.
        </p>
      </section>

      {/* Narrative Split */}
      <section className="about-split">
        <div className="about-split-left">
          <div className="tag">Our Heritage</div>
          <h2 className="sec-title" style={{ marginBottom: '20px', fontSize: '32px' }}>
            Miners at Heart,<br />
            <em>Exporters by Pride</em>
          </h2>
          <p>
            Bin Aouf was established close to Pakistan's salt range in Khushab. Operating near the Warcha and Khewra salt mines allows us to oversee raw extraction directly, ensuring only premium pink crystal rocks enter our sorting and wash facilities.
          </p>
          <p>
            Our core mission is simple: to supply pure, unadulterated Himalayan pink salt to global markets while maintaining ecological mining practices and supporting local refinery workers.
          </p>
          <p>
            From edible table salts to massive salt bricks and architectural wall tiles, we control every step of the process. We verify color consistency, mineral content, and clean packaging standards.
          </p>
        </div>

        <div className="about-split-right">
          <div className="tag">Company Numbers</div>
          <h2 className="sec-title" style={{ marginBottom: '20px', fontSize: '32px' }}>
            Scale and Capacity<br />
            <em>You Can Rely On</em>
          </h2>
          <p>
            We supply wholesale quantities to B2B food manufacturers, retail distributors, livestock suppliers, and wellness networks across the Americas, Europe, and the Middle East.
          </p>

          <div className="about-boxes">
            <div className="about-box">
              <span className="ab-n">15,000+</span>
              <span className="ab-l">Tons Mined Yearly</span>
            </div>
            <div className="about-box">
              <span className="ab-n">100%</span>
              <span className="ab-l">Natural Extraction</span>
            </div>
            <div className="about-box">
              <span className="ab-n">42+</span>
              <span className="ab-l">Custom Cuts & Grades</span>
            </div>
            <div className="about-box">
              <span className="ab-n">3</span>
              <span className="ab-l">Prominent Mine Sources</span>
            </div>
          </div>
        </div>
      </section>

      {/* History and Timeline Section */}
      <section className="about-story-sec">
        <div className="story-inner">
          <div className="story-card">
            <span className="story-big-icon">🏔️</span>
            <h3 className="story-caption">Formed 250M Years Ago</h3>
            <p className="story-sub">Prehistoric Marine Deposits</p>
            <p style={{ fontSize: '13px', opacity: 0.8, marginTop: '14px', fontWeight: 300, lineHeight: 1.8 }}>
              Himalayan pink salt is a relic of ancient seas evaporated over millions of years, locked deep within Pakistan's Salt Range under tectonic pressure. We keep its raw integrity.
            </p>
          </div>

          <div>
            <div className="tag">Our Milestones</div>
            <h2 className="sec-title" style={{ fontSize: '28px', marginBottom: '20px' }}>
              A Timeline of<br />
              <em>Growth & Quality</em>
            </h2>
            
            <div className="timeline">
              <div className="tl-item">
                <div className="tl-year">2018</div>
                <div className="tl-text">
                  <h5>Establishment in Khushab</h5>
                  <p>Bin Aouf was founded near Warcha mines, acting as local extraction brokers and supplying domestic Pakistani processors.</p>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-year">2020</div>
                <div className="tl-text">
                  <h5>Logistics Center Expansion</h5>
                  <p>Inaugurated our sorting and packaging warehouse, optimizing shipping lanes to Port Qasim, Karachi for ocean containers.</p>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-year">2022</div>
                <div className="tl-text">
                  <h5>International Certifications</h5>
                  <p>Obtained international food safety standards (ISO 22000, FDA registration, Halal compliance) to enter strict overseas markets.</p>
                </div>
              </div>
              <div className="tl-item">
                <div className="tl-year">2024</div>
                <div className="tl-text">
                  <h5>Global Exporter Status</h5>
                  <p>Exporting to more than 40 countries, providing private labels for major organic grocery and livestock brands.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="certs-sec">
        <div className="tag center">Certifications</div>
        <h2 className="sec-title white" style={{ textAlign: 'center', marginBottom: '10px' }}>
          Safety and Standard Compliant
        </h2>
        <p style={{ textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto 40px', fontWeight: 300 }}>
          Our salt matches food safety regulations worldwide, satisfying sanitary and organic requirements.
        </p>

        <div className="certs-grid">
          <div className="cert-card">
            <div className="cert-icon">📜</div>
            <h4 className="cert-name">ISO 22000</h4>
            <p className="cert-desc">Food Safety Management System certification. Applies to all edible grind specifications.</p>
          </div>
          <div className="cert-card">
            <div className="cert-icon">☪️</div>
            <h4 className="cert-name">Halal Certified</h4>
            <p className="cert-desc">100% compliant with Islamic dietary requirements for food exports to the Middle East & Southeast Asia.</p>
          </div>
          <div className="cert-card">
            <div className="cert-icon">🇺🇸</div>
            <h4 className="cert-name">FDA Registered</h4>
            <p className="cert-desc">Complies with USA Food & Drug Administration regulations for commercial import into North American retail.</p>
          </div>
          <div className="cert-card">
            <div className="cert-icon">🌱</div>
            <h4 className="cert-name">Natural & Organic</h4>
            <p className="cert-desc">Free from anti-caking chemical compounds, bleach, and artificial colouring. Non-GMO natural minerals.</p>
          </div>
        </div>
      </section>

      {/* Mine Sources Section */}
      <section className="mines-sec">
        <div className="tag center">Our Mine Sources</div>
        <h2 className="sec-title" style={{ textAlign: 'center', marginBottom: '10px' }}>
          Geological Origins of Pink Salt
        </h2>
        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--muted)', maxWidth: '500px', margin: '0 auto 40px', fontWeight: 300 }}>
          Sourced from the Salt Range of Punjab, Pakistan - home to the largest salt deposits on Earth.
        </p>

        <div className="mines-grid">
          {/* Mine 1 */}
          <div className="mine-card">
            <span className="mine-bg-n">01</span>
            <span className="mine-icon">⛏️</span>
            <h3 className="mine-name">Khewra Salt Mine</h3>
            <p className="mine-loc">Jhelum District, Punjab</p>
            <p className="mine-desc">
              The oldest and largest salt mine in Pakistan. Extensively celebrated for high-translucency pink crystals, perfect for lamps, décor tiles, and cosmetic bath grains.
            </p>
            <div className="mine-stats">
              <div className="mine-stat">
                <span className="mine-stat-n">600M T</span>
                <span className="mine-stat-l">Reserves</span>
              </div>
              <div className="mine-stat">
                <span className="mine-stat-n">365m</span>
                <span className="mine-stat-l">Depth</span>
              </div>
              <div className="mine-stat">
                <span className="mine-stat-n">82</span>
                <span className="mine-stat-l">Tunnels</span>
              </div>
            </div>
          </div>

          {/* Mine 2 */}
          <div className="mine-card">
            <span className="mine-bg-n">02</span>
            <span className="mine-icon">⛰️</span>
            <h3 className="mine-name">Warcha Salt Mine</h3>
            <p className="mine-loc">Sargodha District, Punjab</p>
            <p className="mine-desc">
              Yields exceptionally high purity salt with sharp deep pink and reddish crystal profiles. Our primary source for edible table grind and heavy animal lick blocks.
            </p>
            <div className="mine-stats">
              <div className="mine-stat">
                <span className="mine-stat-n">99.1%</span>
                <span className="mine-stat-l">NaCl Purity</span>
              </div>
              <div className="mine-stat">
                <span className="mine-stat-n">Dark Red</span>
                <span className="mine-stat-l">Hue Color</span>
              </div>
              <div className="mine-stat">
                <span className="mine-stat-n">84+</span>
                <span className="mine-stat-l">Minerals</span>
              </div>
            </div>
          </div>

          {/* Mine 3 */}
          <div className="mine-card">
            <span className="mine-bg-n">03</span>
            <span className="mine-icon">🧱</span>
            <h3 className="mine-name">Kalabagh Salt Mine</h3>
            <p className="mine-loc">Mianwali District, Punjab</p>
            <p className="mine-desc">
              Located near the Indus River region. Provides dense multi-colored rock blocks. Ideal for construction-grade bricks, salt tiles, and industrial bulk grades.
            </p>
            <div className="mine-stats">
              <div className="mine-stat">
                <span className="mine-stat-n">84 Min</span>
                <span className="mine-stat-l">Composition</span>
              </div>
              <div className="mine-stat">
                <span className="mine-stat-n">High Density</span>
                <span className="mine-stat-l">Grade</span>
              </div>
              <div className="mine-stat">
                <span className="mine-stat-n">Bulk Silt</span>
                <span className="mine-stat-l">Yield</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
