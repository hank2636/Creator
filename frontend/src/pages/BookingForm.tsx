import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './bookingForm.css';

interface FormData {
  // 一、基本客戶資訊
  name: string;
  contact: string;
  preferredDate: Date | null;
  hasExperience: string;
  
  // 二、拍攝目的與需求確認
  purposes: string[];
  styles: string[];
  location: string;
  shootingDetails: string;
  needsStory: string;
  
  // 三、服裝造型與妝髮需求
  outfitPreparation: string;
  outfitAssistance: string;
  makeupNeeds: string;
  
  // 四、拍攝地點與器材安排
  shootingLocation: string;
  needsLocationAssistance: string;
  needsExtraEquipment: string;
  equipmentDetails: string;
  
  // 五、攝影風格與參考素材
  hasReference: string;
  compositionPreference: string;
  atmosphere: string;
  needsStoryShooting: string;
  
  // 六、授權與使用規範
  allowPortfolio: string;
  needsContract: boolean;
  needsInvoice: boolean;
  
  // 七、費用與付款
  pricingPlan: string;
  depositAmount: string;
  paymentMethod: string;
  understandsPolicy: boolean;
  
  // 八、補充與注意事項
  restrictions: string;
  hasCompanions: string;
  companions: string;
  needsTransportation: string;
  healthNotes: string;

  referenceImages: File[];

  hasScrolledPolicy: boolean;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    preferredDate: null,
    hasExperience: '',
    purposes: [],
    styles: [],
    location: '',
    shootingDetails: '',
    needsStory: '',
    outfitPreparation: '',
    outfitAssistance: '',
    makeupNeeds: '',
    shootingLocation: '',
    needsLocationAssistance: '',
    needsExtraEquipment: '',
    equipmentDetails: '',
    hasReference: '',
    compositionPreference: '',
    atmosphere: '',
    needsStoryShooting: '',
    allowPortfolio: '',
    needsContract: false,
    needsInvoice: false,
    pricingPlan: '',
    depositAmount: '',
    paymentMethod: '',
    understandsPolicy: false,
    restrictions: '',
    hasCompanions: '',
    companions: '',
    needsTransportation: '',
    healthNotes: '',
    referenceImages: [],
    hasScrolledPolicy: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[name as keyof FormData] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [name]: newValues };
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      preferredDate: date
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        referenceImages: [...prev.referenceImages, ...files]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      referenceImages: prev.referenceImages.filter((_, i) => i !== index)
    }));
  };

  const handlePolicyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // 當用戶滾動到距離底部 20px 以內時，啟用勾選框
    if (scrollHeight - scrollTop - clientHeight < 20) {
      setFormData(prev => ({ ...prev, hasScrolledPolicy: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('表單數據：', formData);
    alert('表單已送出！');
  };

  return (
    <div className="form-container">
      <h2>乾靖娛樂 - 人像攝影接案確認表單</h2>
      <form onSubmit={handleSubmit}>
        {/* 一、基本客戶資訊 */}
        <section className="form-section">
          <h3>一、基本客戶資訊</h3>
          <div className="form-group">
            <label htmlFor="name">姓名／暱稱</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="請輸入您的姓名或暱稱"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">聯絡方式</label>
            <div className="contact-inputs">
              <input
                type="text"
                id="line"
                name="line"
                placeholder="Line ID"
                className="contact-input"
              />
              <input
                type="text"
                id="ig"
                name="ig"
                placeholder="Instagram"
                className="contact-input"
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="電話"
                className="contact-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="preferredDate">拍攝日期希望</label>
            <DatePicker
              selected={formData.preferredDate}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="請選擇拍攝日期"
              className="date-picker"
              minDate={new Date()}
              required
            />
          </div>

          <div className="form-group">
            <label>是否有拍攝經驗</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="hasExperience"
                  value="是"
                  checked={formData.hasExperience === '是'}
                  onChange={handleRadioChange}
                />
                是
              </label>
              <label>
                <input
                  type="radio"
                  name="hasExperience"
                  value="否"
                  checked={formData.hasExperience === '否'}
                  onChange={handleRadioChange}
                />
                否
              </label>
            </div>
          </div>
        </section>

        {/* 二、拍攝目的與需求確認 */}
        <section className="form-section">
          <h3>二、拍攝目的與需求確認</h3>
          <div className="form-group">
            <label>拍攝用途（可多選）</label>
            <div className="checkbox-group">
              {['寫真', '形象照', '商業', '履歷', '交友軟體', '紀念', '其他'].map(purpose => (
                <label key={purpose} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.purposes.includes(purpose)}
                    onChange={() => handleCheckboxChange('purposes', purpose)}
                  />
                  {purpose}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>照片風格傾向（可多選）</label>
            <div className="checkbox-group">
              {['清新', '時尚', '暗黑', '甜美', '其他'].map(style => (
                <label key={style} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.styles.includes(style)}
                    onChange={() => handleCheckboxChange('styles', style)}
                  />
                  {style}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>拍攝地點</label>
            <div className="radio-group">
              {['棚內', '外景', '尚未決定'].map(loc => (
                <label key={loc}>
                  <input
                    type="radio"
                    name="location"
                    value={loc}
                    checked={formData.location === loc}
                    onChange={handleRadioChange}
                  />
                  {loc}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="shootingDetails">希望拍攝時長／張數／精修數</label>
            <input
              type="text"
              id="shootingDetails"
              name="shootingDetails"
              value={formData.shootingDetails}
              onChange={handleInputChange}
              placeholder="例如：2小時／50張／10張精修"
            />
          </div>

          <div className="form-group">
            <label>是否需角色或劇情設定</label>
            <div className="radio-group">
              {['需要', '不需要', '尚未決定'].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name="needsStory"
                    value={option}
                    checked={formData.needsStory === option}
                    onChange={handleRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* 三、服裝造型與妝髮需求 */}
        <section className="form-section">
          <h3>三、服裝造型與妝髮需求</h3>
          <div className="form-group">
            <label>服裝由誰準備？是否需協助搭配？</label>
            <div className="radio-group">
              {['自備', '需要協助搭配', '尚未決定'].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name="outfitPreparation"
                    value={option}
                    checked={formData.outfitPreparation === option}
                    onChange={handleRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>是否需要安排妝髮？</label>
            <div className="radio-group">
              {['需要', '不需要', '自備'].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name="makeupNeeds"
                    value={option}
                    checked={formData.makeupNeeds === option}
                    onChange={handleRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* 四、拍攝地點與器材安排 */}
        <section className="form-section">
          <h3>四、拍攝地點與器材安排</h3>
          <div className="form-group">
            <label>拍攝地點選擇</label>
            <div className="radio-group">
              {['乾靖棚', '外景'].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name="shootingLocation"
                    value={option}
                    checked={formData.shootingLocation === option}
                    onChange={handleRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>是否需協助安排外景場地</label>
            <div className="radio-group">
              {['是', '否'].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name="needsLocationAssistance"
                    value={option}
                    checked={formData.needsLocationAssistance === option}
                    onChange={handleRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>是否需額外布景／燈光／道具</label>
            <div className="radio-group">
              {['是', '否'].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name="needsExtraEquipment"
                    value={option}
                    checked={formData.needsExtraEquipment === option}
                    onChange={handleRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {formData.needsExtraEquipment === '是' && (
            <div className="form-group">
              <label htmlFor="equipmentDetails">請說明需要的器材</label>
              <textarea
                id="equipmentDetails"
                name="equipmentDetails"
                value={formData.equipmentDetails}
                onChange={handleInputChange}
                placeholder="請詳細說明需要的器材"
              />
            </div>
          )}
        </section>

        {/* 五、攝影風格與參考素材 */}
        <section className="form-section">
          <h3>五、攝影風格與參考素材</h3>
          <div className="form-group">
            <label>是否有參考圖可提供？</label>
            <div className="radio-group">
              {['是', '否'].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name="hasReference"
                    value={option}
                    checked={formData.hasReference === option}
                    onChange={handleRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {formData.hasReference === '是' && (
            <div className="form-group">
              <label className="file-upload-label">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-upload-input"
                />
                <span className="file-upload-text">點擊上傳參考圖片</span>
              </label>
              {formData.referenceImages.length > 0 && (
                <div className="uploaded-files">
                  <h4>已上傳的圖片：</h4>
                  <ul>
                    {formData.referenceImages.map((file, index) => (
                      <li key={index}>
                        {file.name}
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="remove-file-btn"
                        >
                          移除
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="compositionPreference">有無角度／構圖偏好</label>
            <input
              type="text"
              id="compositionPreference"
              name="compositionPreference"
              value={formData.compositionPreference}
              onChange={handleInputChange}
              placeholder="請描述您偏好的拍攝角度或構圖方式"
            />
          </div>

          <div className="form-group">
            <label htmlFor="atmosphere">想要的拍攝氛圍描述</label>
            <textarea
              id="atmosphere"
              name="atmosphere"
              value={formData.atmosphere}
              onChange={handleInputChange}
              placeholder="請描述您期望的拍攝氛圍"
            />
          </div>

          <div className="form-group">
            <label>是否希望劇情式拍攝？</label>
            <div className="radio-group">
              {['是', '否'].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name="needsStoryShooting"
                    value={option}
                    checked={formData.needsStoryShooting === option}
                    onChange={handleRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* 六、授權與使用規範 */}
        <section className="form-section">
          <h3>六、授權與使用規範</h3>
          <div className="form-group">
            <label>是否同意乾靖作為作品集公開</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="allowPortfolio"
                  value="是"
                  checked={formData.allowPortfolio === '是'}
                  onChange={handleRadioChange}
                />
                是
              </label>
              <label>
                <input
                  type="radio"
                  name="allowPortfolio"
                  value="否"
                  checked={formData.allowPortfolio === '否'}
                  onChange={handleRadioChange}
                />
                否
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>其他需求（可多選）</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.needsContract}
                  onChange={(e) => setFormData(prev => ({ ...prev, needsContract: e.target.checked }))}
                />
                需要合約
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.needsInvoice}
                  onChange={(e) => setFormData(prev => ({ ...prev, needsInvoice: e.target.checked }))}
                />
                需要發票
              </label>
            </div>
          </div>
        </section>

        {/* 七、費用與付款 */}
        <section className="form-section">
          <h3>七、費用與付款</h3>
          <div className="form-group">
            <label>確認報價方案</label>
            <div className="pricing-options">
              <label className="pricing-option">
                <input
                  type="radio"
                  name="pricingPlan"
                  value="A"
                  checked={formData.pricingPlan === 'A'}
                  onChange={handleRadioChange}
                />
                <div className="pricing-content">
                  <h4>A方案｜棚拍風格混搭體驗</h4>
                  <p>NT$3,800 / 2hr</p>
                  <p>NT$5,500 / 3hr（好友合作價）</p>
                </div>
              </label>
              <label className="pricing-option">
                <input
                  type="radio"
                  name="pricingPlan"
                  value="B"
                  checked={formData.pricingPlan === 'B'}
                  onChange={handleRadioChange}
                />
                <div className="pricing-content">
                  <h4>B方案｜外景自然寫真探索</h4>
                  <p>NT$3,200 / 2hr</p>
                  <p>NT$4,800 / 3hr（好友合作價）</p>
                </div>
              </label>
              <label className="pricing-option">
                <input
                  type="radio"
                  name="pricingPlan"
                  value="C"
                  checked={formData.pricingPlan === 'C'}
                  onChange={handleRadioChange}
                />
                <div className="pricing-content">
                  <h4>C方案｜故事性情緒創作拍攝</h4>
                  <p>NT$4,200 / 2hr</p>
                  <p>NT$6,000 / 3hr（好友合作價）</p>
                </div>
              </label>
              <label className="pricing-option">
                <input
                  type="radio"
                  name="pricingPlan"
                  value="custom"
                  checked={formData.pricingPlan === 'custom'}
                  onChange={handleRadioChange}
                />
                <div className="pricing-content">
                  <h4>客製化方案</h4>
                  <p>價格另計</p>
                </div>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="depositAmount">訂金金額</label>
            <input
              type="number"
              id="depositAmount"
              name="depositAmount"
              value={formData.depositAmount}
              onChange={handleInputChange}
              placeholder="請輸入訂金金額"
            />
          </div>

          <div className="form-group">
            <label>付款方式</label>
            <div className="radio-group">
              {['轉帳', '現金'].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option}
                    checked={formData.paymentMethod === option}
                    onChange={handleRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>取消／延期政策</label>
            <div className="policy-container">
              <div className="policy-content" onScroll={handlePolicyScroll}>
                <h4>取消政策</h4>
                <ul>
                  <li>拍攝日前 7 天以上取消：全額退還訂金</li>
                  <li>拍攝日前 3-7 天取消：退還 50% 訂金</li>
                  <li>拍攝日前 3 天內取消：不予退還訂金</li>
                </ul>
                <h4>延期政策</h4>
                <ul>
                  <li>拍攝日前 7 天以上申請延期：可免費改期一次</li>
                  <li>拍攝日前 3-7 天申請延期：需支付 30% 改期費用</li>
                  <li>拍攝日前 3 天內申請延期：需支付 50% 改期費用</li>
                </ul>
                <h4>注意事項</h4>
                <ul>
                  <li>改期需視攝影師檔期而定</li>
                  <li>改期次數以一次為限</li>
                  <li>若因天災等不可抗力因素，將另行協商處理</li>
                </ul>
              </div>
              <div className="policy-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.understandsPolicy}
                    onChange={(e) => setFormData(prev => ({ ...prev, understandsPolicy: e.target.checked }))}
                    disabled={!formData.hasScrolledPolicy}
                  />
                  我已完整閱讀並同意上述取消／延期政策
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* 八、補充與注意事項 */}
        <section className="form-section">
          <h3>八、補充與注意事項</h3>
          <div className="form-group">
            <label htmlFor="restrictions">是否有忌諱內容或限制？</label>
            <textarea
              id="restrictions"
              name="restrictions"
              value={formData.restrictions}
              onChange={handleInputChange}
              placeholder="請說明任何需要避免的內容或限制"
            />
          </div>

          <div className="form-group">
            <label>是否會有人同行</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="hasCompanions"
                  value="是"
                  checked={formData.hasCompanions === '是'}
                  onChange={handleRadioChange}
                />
                是
              </label>
              <label>
                <input
                  type="radio"
                  name="hasCompanions"
                  value="否"
                  checked={formData.hasCompanions === '否'}
                  onChange={handleRadioChange}
                />
                否
              </label>
            </div>
            {formData.hasCompanions === '是' && (
              <div className="companion-details">
                <label htmlFor="companions">請輸入預計同行的人數與關係</label>
                <input
                  type="text"
                  id="companions"
                  name="companions"
                  value={formData.companions}
                  onChange={handleInputChange}
                  placeholder="例如：一人/化妝師"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>是否需交通協助？</label>
            <div className="radio-group">
              {['是', '否'].map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name="needsTransportation"
                    value={option}
                    checked={formData.needsTransportation === option}
                    onChange={handleRadioChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="healthNotes">有無需留意的體質或過敏</label>
            <textarea
              id="healthNotes"
              name="healthNotes"
              value={formData.healthNotes}
              onChange={handleInputChange}
              placeholder="請說明任何需要注意的健康狀況"
            />
          </div>
        </section>

        <button type="submit" className="submit-button">
          提交表單
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
