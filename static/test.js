var ArrayList = Packages.java.util.ArrayList;
var HashMap = Packages.java.util.HashMap;
var List = Packages.java.util.List;

var DialogInterface = Packages.android.content.DialogInterface;
var Intent = Packages.android.content.Intent;
var Bundle = Packages.android.os.Bundle;
var Editable = Packages.android.text.Editable;
var InputFilter = Packages.android.text.InputFilter;
var SpannableString = Packages.android.text.SpannableString;
var Spanned = Packages.android.text.Spanned;
var TextUtils = Packages.android.text.TextUtils;
var TextWatcher = Packages.android.text.TextWatcher;
var ForegroundColorSpan = Packages.android.text.style.ForegroundColorSpan;
var MotionEvent = Packages.android.view.MotionEvent;
var View = Packages.android.view.View;
var OnTouchListener = Packages.android.view.View.OnTouchListener;
var AdapterView = Packages.android.widget.AdapterView;
var CheckBox = Packages.android.widget.CheckBox;
var EditText = Packages.android.widget.EditText;
var ImageView = Packages.android.widget.ImageView;
var RelativeLayout = Packages.android.widget.RelativeLayout;
var TextView = Packages.android.widget.TextView;
var Toast = Packages.android.widget.Toast;
var StringBuilder = Packages.java.lang.StringBuilder;
var Runnable = Packages.java.lang.Runnable;
var BuildConfig = Packages.com.baidu.patient.BuildConfig;
var PatientApplication = Packages.com.baidu.patient.PatientApplication;
var R = Packages.com.baidu.patient.R;
var PhotoListAdapter = Packages.com.baidu.patient.adapter.PhotoListAdapter;
var Common = Packages.com.baidu.patient.common.Common;
var CommonUtil = Packages.com.baidu.patient.common.CommonUtil;
var GlobalParamsUtil = Packages.com.baidu.patient.common.GlobalParamsUtil;
var ImageLoaderUtil = Packages.com.baidu.patient.common.ImageLoaderUtil;
var PhotoPickUtil = Packages.com.baidu.patient.common.PhotoPickUtil;
var StringUtils = Packages.com.baidu.patient.common.StringUtils;
var ToastUtil = Packages.com.baidu.patient.common.ToastUtil;
var ConfigManager = Packages.com.baidu.patient.manager.ConfigManager;
var RSAManager = Packages.com.baidu.patient.manager.RSAManager;
var ReportManager = Packages.com.baidu.patient.manager.ReportManager;
var MTJReport = Packages.com.baidu.patient.manager.ReportManager.MTJReport;
var StatReport = Packages.com.baidu.patient.manager.ReportManager.StatReport;
var UserManager = Packages.com.baidu.patient.manager.UserManager;
var CircleImageView = Packages.com.baidu.patient.view.CircleImageView;
var EditTextClear = Packages.com.baidu.patient.view.EditTextClear;
var HorizontalListView = Packages.com.baidu.patient.view.HorizontalListView;
var CommonDialog = Packages.com.baidu.patient.view.dialog.CommonDialog;
var DialogListView = Packages.com.baidu.patient.view.itemview.DialogListView;
var PhotoListItemView = Packages.com.baidu.patient.view.itemview.PhotoListItemView;
var ImageCacheWrapper = Packages.com.baidu.patient.view.shopppingcart.ImageCacheWrapper;
var ModelUtil = Packages.com.baidu.patient.view.shopppingcart.ModelUtil;
var Utils = Packages.com.baidu.patientdatasdk.common.Utils;
var AppointController = Packages.com.baidu.patientdatasdk.controller.AppointController;
var BaseController = Packages.com.baidu.patientdatasdk.controller.BaseController;
var ContactsController = Packages.com.baidu.patientdatasdk.controller.ContactsController;
var ImageUploadController = Packages.com.baidu.patientdatasdk.controller.ImageUploadController;
var Contacts = Packages.com.baidu.patientdatasdk.dao.Contacts;
var DoctorDetail = Packages.com.baidu.patientdatasdk.dao.DoctorDetail;
var Patient = Packages.com.baidu.patientdatasdk.extramodel.AppointmentDetailModel.Patient;
var DoctorDay = Packages.com.baidu.patientdatasdk.extramodel.DoctorDetailModel.DoctorDay;
var ImageInfo = Packages.com.baidu.patientdatasdk.extramodel.ImageInfo;
var ShoppingCartModel = Packages.com.baidu.patientdatasdk.extramodel.ShoppingCartModel;
var ShoppingCartWrapper = Packages.com.baidu.patientdatasdk.extramodel.ShoppingCartWrapper;
var AppointAddListener = Packages.com.baidu.patientdatasdk.listener.AppointAddListener;
var AppointAddValidateListener = Packages.com.baidu.patientdatasdk.listener.AppointAddValidateListener;
var ListResponseListener = Packages.com.baidu.patientdatasdk.listener.ListResponseListener;
var ContactsEditActivity = Packages.com.baidu.patient.activity.ContactsEditActivity;
var DoctorSubmitActivity = Packages.com.baidu.patient.activity.DoctorSubmitActivity;
/***************************************************************/
var mDescriptionTextWatcher = new TextWatcher(){
    onTextChanged : function(s,  start,  before,  count) {},
    beforeTextChanged : function(s,  start,  count,  after) {},
    afterTextChanged : function( s) {
        mPatientDescriptionSizeTextView.setText(Activity.getString(R.string.appoint_doctor_patient_description_size,
            DESC_SIZE - s.toString().length()));
    }
};
var mQueryContactRunnable = new Runnable() {
    run : function(){
        showRealView();
    }
};
var TAG = "DoctorAppointActivity";

var mContactList = new ArrayList();
var mSubmitSusseed;
var mContactId;
var mSourcePhone;

var mCircleImageView;
var mNameTextView;
var mMedTitleTextView;
var mHospitalTextView;
var mReserveTextView;
var mParentView;
var mDescriptionEditText;
var mPatientDescriptionSizeTextView;
var mPhoneContainer;
var mVisitCardContainer;
var mVisitCardPwdContainer;
var mVisitCardNumberEditText = new EditTextClear(Activity);
var mVisitCardPwdEditText;
var mPhoneEditTextClear;
var mCheckBox;
var mHorizontalListView;
var mPhotoTipsView;
var mMaskView;
var mPhotoView;
var mSubmitView;
var mDescBlankView;
var mDescTopLineView;
var mDescBottomLineView;
var mPhotoBottomLineView;
var mPatientAgreementTextView;
var mContactNameTextView;
var mContactNameTextViewRight;
var mContactNameImageView;
var mAdapter;
var mImageCacheWrapper;

var mUpdateSucceedImageList = new ArrayList();
var DESC_SIZE  = 300;

var mModel;
var mController;
var mIsRepickDoctor;


var mNeedVisitCard;
var mNeedVisitCardPwd;
var mDisplayDiseaseImage;

var mCurrentId = "0";
var mPreId = "0";
/***************************************************************/
function onCreate(savedInstanceState) {
    Activity.setContentView(R.layout.activity_doctorappointment);

    var intent = Activity.getIntent();
    if (intent != null) {
        var object = GlobalParamsUtil.getInstance().getGlobalParamFromIntent(Common.GLOBAL_DOCTOR_DETAIL_MODEL,
            intent);
        if (object != null && object instanceof ShoppingCartModel) {
            mModel = object;
            mNeedVisitCard = CommonUtil.parseIntegerValue(mModel.mDoctorDetailModel.getDoctorDetail().getNeedCard()) == 1;
            mNeedVisitCardPwd = mModel.mDoctorDetailModel.getDoctorDetail().mNeedCardPassword;
            mDisplayDiseaseImage = mModel.mDoctorDetailModel.getDoctorDetail().mDisplayDiseaseImage;
            mIsRepickDoctor = ShoppingCartWrapper.getInstance().mFromSelectDoctor;
        }
    } else {
        finish();
        return;
    }

    initView();
    bindData();

    if (UserManager.getInstance().isUserLogin()) {
        loadContactFromServer();
    } else {
        initContact();
    }
    mImageCacheWrapper = new ImageCacheWrapper();
    mController = new AppointController();
    initAppointAddListener();
    initValidateParamsListener();
    initImageUploadListener();

    initAppointInfoWithCache();
}

function initView() {
    mParentView = Activity.findViewById(R.id.parent_container);

    mCircleImageView = Activity.findViewById(R.id.doctor_confirm_avatar_iv);
    mCircleImageView.setBorderWidth(2);
    mCircleImageView.setBorderColor(0xc0cfda);
    mNameTextView =  Activity.findViewById(R.id.doctor_confirm_name_tv);
    mMedTitleTextView =  Activity.findViewById(R.id.doctor_confirm_medtitle_tv);
    mHospitalTextView =  Activity.findViewById(R.id.doctor_confirm_hospitcal_tv);
    mReserveTextView =  Activity.findViewById(R.id.doctor_confirm_reserve_time);

    mPhoneEditTextClear =  Activity.findViewById(R.id.patient_phone_value_tv);
    var filter = [];
    filter.push(new InputFilter.LengthFilter(11));
    mPhoneEditTextClear.setFilters(filter);
    mContactNameTextView =  Activity.findViewById(R.id.contact_item_tv);
    mContactNameTextViewRight =  Activity.findViewById(R.id.contact_item_tv_right);
    mContactNameImageView =  Activity.findViewById(R.id.contact_item_iv);
    mPhotoView = Activity.findViewById(R.id.photo_container);
    mPhoneContainer =  Activity.findViewById(R.id.phone_container);
    mSubmitView = Activity.findViewById(R.id.patient_submint_tv);

    mVisitCardContainer =  Activity.findViewById(R.id.visit_card_number_container);
    mVisitCardNumberEditText =  Activity.findViewById(R.id.visit_card_value_tv);

    mVisitCardPwdContainer =  Activity.findViewById(R.id.visit_card_password_container);
    mVisitCardPwdEditText =  Activity.findViewById(R.id.visit_card_password_value_tv);

    mDescriptionEditText =  Activity.findViewById(R.id.patient_description_tv);
    mPatientDescriptionSizeTextView =  Activity.findViewById(R.id.description_size_tv);

    mCheckBox =  Activity.findViewById(R.id.patient_checkbox);
    mPatientAgreementTextView =  Activity.findViewById(R.id.patient_agreement_tv);

    mHorizontalListView =  Activity.findViewById(R.id.patient_photo_list_view);
    mPhotoTipsView = Activity.findViewById(R.id.patient_photo_tips_container);
    mMaskView = Activity.findViewById(R.id.mask_doctorappoint);

    mDescBlankView = Activity.findViewById(R.id.desc_blank_view);
    mDescTopLineView = Activity.findViewById(R.id.desc_top_line);
    mDescBottomLineView = Activity.findViewById(R.id.desc_bottom_line);
    mPhotoBottomLineView = Activity.findViewById(R.id.photo_bottom_line);
}

function bindData() {
    mParentView.setVisibility(View.GONE);
    setDoctorUI();
    if (!mIsRepickDoctor) {
        Activity.findViewById(R.id.pick_contact_contaienr).setOnClickListener(function(){
            var isLogin = UserManager.getInstance().isUserLogin();
            if ((isLogin && mContactList.isEmpty()) || !isLogin) {
                startAddContactActivity();
            } else {
                startPickContactActivity();
            }
        });
    } else {
        mContactNameTextView.setTextColor(0x808080);
    }

    mPhoneContainer.setOnTouchListener(function(){
            mPhoneEditTextClear.requestFocus();
            CommonUtil.showSoftInputMethod();
            return false;
    });

    if (mNeedVisitCard) {
        mVisitCardContainer.setVisibility(View.VISIBLE);
        mVisitCardNumberEditText.setVisibility(View.VISIBLE);
        mVisitCardNumberEditText.setHint(R.string.appoint_doctor_visit_card_number_hint);
    }
    if (mNeedVisitCardPwd) {
        mVisitCardPwdContainer.setVisibility(View.VISIBLE);
        mVisitCardPwdEditText.setHint(R.string.appoint_doctor_visit_card_password_hint);
    }

    mPatientDescriptionSizeTextView.setText(Activity.getString(R.string.appoint_doctor_patient_description_size, DESC_SIZE));
    mDescriptionEditText.addTextChangedListener(mDescriptionTextWatcher);

    mPatientAgreementTextView.setOnClickListener(function(){
        var intent = new Intent();
        intent.putExtra(Common.PREVIOUS_ACTIVITY_ID,mCurrentId);
        WebViewCacheActivity.launchSelf(Activity, BaseController.getProtocolUrl(),
            Activity.getString(R.string.appoint_doctor_baidu_doctor_agreement), intent);
    });
    var agreement = Activity.getString(R.string.appoint_doctor_patient_agreement, "《", "》");
    var sp = new SpannableString(agreement);
    sp.setSpan(new ForegroundColorSpan(0x07b8dd), agreement.indexOf("《"),
        agreement.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
    mPatientAgreementTextView.setText(sp);

    mSubmitView.setOnClickListener(function(){
        var result = isParamValid();
        if (!result) {
            Toast.makeText(Activity,"isParamValid = false",1).show();
            return;
        }

        if (!UserManager.getInstance().isUserLogin()) {
            Toast.makeText(Activity,"user not login",1).show();
            validateParams();
            return;
        }

        uploadImageAndsubmitAppointment();
    });
    mPhotoTipsView.setOnClickListener(function(){
        ReportManager.getInstance().report(MTJReport.EVENT_ID_PICK_PATIENT_PHOTOS);
        showPickPhotoDialog();
    });
    mAdapter = new PhotoListAdapter(Activity);
    mHorizontalListView.setAdapter(mAdapter);
    mHorizontalListView.setOnItemClickListener(function(){
        onItemClick : function (parent, view, position, id){
            if (view instanceof PhotoListItemView) {
                showPickPhotoDialog();
                var itemView = view;
                var imageInfo = itemView.getImageInfo();
                if (TextUtils.isEmpty(imageInfo.getBigImg())) {
                } else {
                    ImageScannerActivity.launchSelf(Activity,mImageCacheWrapper.getAllRealImageList(), position, START_IMAGE_GALLERY_CODE);
                }
            }
        }
    });


    var visible = mDisplayDiseaseImage ? View.VISIBLE : View.GONE;
    mPhotoView.setVisibility(visible);
    mDescriptionEditText.setVisibility(visible);
    mPatientDescriptionSizeTextView.setVisibility(visible);
    mDescBlankView.setVisibility(visible);
    mDescTopLineView.setVisibility(visible);
    mDescBottomLineView.setVisibility(visible);
    mPhotoBottomLineView.setVisibility(visible);
}

function setDoctorUI() {
    var doctor = mModel.mDoctorDetailModel.getDoctorDetail();


    ImageLoaderUtil.displayImage(doctor.getAvatar(), mCircleImageView);
    mNameTextView.setText(doctor.getName());
    var medTitle = (StringUtils.isEmptyOrNull(doctor.getMedTitle())) ? "" : doctor.getMedTitle();
    mMedTitleTextView.setText(medTitle);
    var isVerify = CommonUtil.parseIntegerValue(doctor.getIsVerify());
    mNameTextView.setCompoundDrawablesWithIntrinsicBounds(0, 0, isVerify == 1 ? R.drawable.doc_mark_02 : 0, 0);
    var hospitalName = StringUtils.isEmptyOrNull(doctor.getHospitalName()) ? "" : doctor.getHospitalName();
    mHospitalTextView.setText(hospitalName);

    var rid = 0;
    switch (mModel.mDoctorDay.mTimeSlot) {
        case DoctorDay.MORNING:
            rid = R.string.calendar_morning;
            break;
        case DoctorDay.AFTERNOON:
            rid = R.string.calendar_afternoon;
            break;
        case DoctorDay.EVENING:
            rid = R.string.calendar_evening;
            break;
        default:
            break;
    }
    var builder = new StringBuilder();
    builder.append(" ").append(mModel.mDoctorDay.getDate()).append(" ");
    if (rid != 0) {
        builder.append(Activity.getString(rid));
    }
    mReserveTextView.setText(Activity.getString(R.string.appoint_doctor_reserve_time, builder.toString()));
}


function needCheckPhoneNumber( phone) {
    return StringUtils.isEmptyOrNull(mSourcePhone) || !mSourcePhone == phone;
}

function initAppointInfoWithCache() {
    var cache = ShoppingCartWrapper.getInstance();
    if (mDisplayDiseaseImage) {
        var imageSize = cache.mCacheImageInfoList.size();
        if (imageSize > 0) {
            for (var i = 0; i < imageSize; i++) {
                var info = cache.mCacheImageInfoList.get(i);
                if (info == null) {
                    continue;
                }
                mImageCacheWrapper.addImageInfo(info.getBigImg(), info.getSmallImg());
            }
        }

        if (mImageCacheWrapper.getAllRealImageList().size() > 0) {
            mAdapter.setImageInfoList(mImageCacheWrapper.getImageInfoList());
            mHorizontalListView.setVisibility(View.VISIBLE);
            mMaskView.setVisibility(View.GONE);
            mPhotoTipsView.setVisibility(View.GONE);
        } else {
            mHorizontalListView.setVisibility(View.GONE);
            mMaskView.setVisibility(View.VISIBLE);
            mPhotoTipsView.setVisibility(View.VISIBLE);
        }

        if (!StringUtils.isEmptyOrNull(cache.mPatient.mPatientDesc)) {
            mDescriptionEditText.setText(cache.mPatient.mPatientDesc);
        }
    }

    if (!StringUtils.isEmptyOrNull(cache.mPatient.mPatientVisitCard)) {
        mVisitCardNumberEditText.setText(cache.mPatient.mPatientVisitCard);
    }

    if (!StringUtils.isEmptyOrNull(cache.mPatient.mPatientPhone)) {
        mPhoneEditTextClear.setText(cache.mPatient.mPatientPhone);
    }
}

function showAppointUI() {
    mParentView.setVisibility(View.VISIBLE);
    var result = UserManager.getInstance().isUserLogin() && !mContactList.isEmpty();
    updatePatientUI(result);
}

function loadContactFromServer() {
    queryContact();
    PatientApplication.getInstance().getHandler().postDelayed(mQueryContactRunnable, 2000);
}

function showRealView() {
    Activity.runOnUiThread(new Runnable(){
        run : function() {
            //controlLoadingDialog(false);
            mParentView.setVisibility(View.VISIBLE);
        }
    });
}

function queryContact() {
    ContactsController.getInstance().setListResponseListener(new ListResponseListener() {
        onResponseFailed : function( status,  errorMessage) {
            showRealView();
        },
        onResponseList : function(list) {
            showRealView();
            if (list == null) {
                return;
            }
            PatientApplication.getInstance().getHandler().removeCallbacks(mQueryContactRunnable);
            mContactList = list;
            Activity.runOnUiThread(new Runnable() {
                run : function() {
                    initContact();
                }
            });
        }
    });

    //controlLoadingDialog(true);
    ContactsController.getInstance().queryContactForAppoint(mPreId, mCurrentId, 1);
}

function initContact() {
    var cache = ShoppingCartWrapper.getInstance();
    if (UserManager.getInstance().isUserLogin()) {
        if (!mContactList.isEmpty()) {
            var contactHistoryId = ConfigManager.getInstance()
                .getLongValue(ConfigManager.CONTACT_HISTORY_KEY, 0);
            var cacheContacts = null;
            if (contactHistoryId > 0) {
                for (var index = 0; index < mContactList.size(); index ++) {
                    var contacts = mContactList.get(index);
                    if (contacts == null) {
                        continue;
                    }

                    if (contactHistoryId == CommonUtil.parseLongValue(contacts.getId())) {
                        cacheContacts = contacts;
                        break;
                    }
                }
            }

            if (cacheContacts == null) {
                cacheContacts = mContactList.get(0);
            }

            setContactUI(cacheContacts);
        }
    } else {
        var contact = cache.getContactFromPatient();
        if (contact != null) {
            setContactUI(contact);
            mContactList.add(contact);
        }
    }

    showAppointUI();
}

function setContactUI( contacts) {
    if (contacts == null) {
        return;
    }

    mContactId = CommonUtil.parseLongValue(contacts.getId());
    ShoppingCartWrapper.getInstance().mPatient.mPatientId = mContactId;

    mContactNameTextView.setText(contacts.getName());
    if (!StringUtils.isEmptyOrNull(contacts.mPhone)) {
        mPhoneEditTextClear.setText(contacts.mPhone);
        mSourcePhone = contacts.mPhone;
    }
}

function isParamValid() {

    var isPatientEmpty = ShoppingCartWrapper.getInstance().isPatientEmpty();
    if (isPatientEmpty) {
        ToastUtil.showToast(Activity, R.string.appoint_doctor_validate_contact);
        return false;
    }


    var phone = mPhoneEditTextClear.getText().toString().trim();
    if (needCheckPhoneNumber(phone)) {
        if (CommonUtil.isPhoneError(phone)) {
            ToastUtil.showToast(Activity, R.string.appoint_doctor_validate_phone_error);
            return false;
        }
    }


    var isVisitCardNull = TextUtils.isEmpty(mVisitCardNumberEditText.getText().toString().trim());
    if (mNeedVisitCard && isVisitCardNull) {
        ToastUtil.showToast(Activity, R.string.appoint_doctor_validate_card_error);
        return false;
    }


    var isVisitCardPwdNull = TextUtils.isEmpty(mVisitCardPwdEditText.getText().toString().trim());
    if (mNeedVisitCardPwd && isVisitCardPwdNull) {
        ToastUtil.showToast(Activity, R.string.appoint_doctor_validate_card_pwd_error);
        return false;
    }


    var isDescNull = TextUtils.isEmpty(mDescriptionEditText.getText().toString().trim());
    if (mDisplayDiseaseImage && isDescNull) {
        ToastUtil.showToast(Activity, R.string.appoint_doctor_validate_description);
        return false;
    }


    var needAgree = !mCheckBox.isChecked();
    if (needAgree) {
        Toast.makeText(Activity, R.string.appoint_doctor_validate_agreement, Toast.LENGTH_SHORT).show();
        return false;
    }

    return true;
}

function buildPatient() {
    var cache = ShoppingCartWrapper.getInstance();
    var patient = new Patient();
    patient.mPatientName = mContactNameTextView.getText().toString().trim();
    patient.mPatientIdentification = cache.mPatient.mPatientIdentification;
    patient.mPatientDesc = mDescriptionEditText.getText().toString().trim();

    if (UserManager.getInstance().isUserLogin() && mContactId > 0) {
        patient.mPatientId = mContactId;
        patient.mPatientPhone = "";
        var phone = mPhoneEditTextClear.getText().toString().trim();
        if (needCheckPhoneNumber(phone)) {
            patient.mPatientPhone = phone;
        }
    } else {
        patient.mPatientId = -1;
        patient.mPatientPhone = cache.mPatient.mPatientPhone;
    }

    return patient;
}

function buildVisitCard() {
    var visitCardMap = new HashMap();
    if (mNeedVisitCard && mModel != null) {
        visitCardMap.put(mModel.mDoctorDetailModel.getDoctorDetail().getHospitalId(),
            mVisitCardNumberEditText.getText().toString());
    }
    return visitCardMap;
}

function submitAppoint() {
    var cardPwd = "";
    if (mNeedVisitCardPwd) {
        var pwd = mVisitCardPwdEditText.getText().toString().trim();
        cardPwd = RSAManager.encrytData(pwd);
    }

    var appointId = CommonUtil.parseLongValue(ShoppingCartWrapper.getInstance().mAppointId);

    mController.addAppoint(mPreId, mCurrentId, mContactId, ModelUtil.getAppointmentInfo(),
        appointId, buildPatient(), buildVisitCard(), mUpdateSucceedImageList, cardPwd,
        mDisplayDiseaseImage, mNeedVisitCard);
}

function uploadImageAndsubmitAppointment() {
    if (mImageCacheWrapper.getLocalImageList().size() <= 0 || !mDisplayDiseaseImage) {
        submitAppoint();
    } else {
        uploadImage();
    }
}

function startAddContactActivity() {
    var intent = new Intent();
    intent.putExtra(Common.PREVIOUS_ACTIVITY_ID,mCurrentId);
    intent.setClassName(Activity,"com.baidu.patient.activity.ContactsEditActivity");
    var cache = ShoppingCartWrapper.getInstance();
    if (!cache.mPatient.isEmpty()) {
        intent.putExtra(Common.CONTACT_ID, -1);
        intent.putExtra(Common.CONTACT_NAME, cache.mPatient.mPatientName);
        intent.putExtra(Common.CONTACT_PHONE, cache.mPatient.mPatientPhone);
        intent.putExtra(Common.CONTACT_IDENTITY, cache.mPatient.mPatientIdentification);
    }
    CommonUtil.startActivityForResult(Activity, intent, Common.LAUNCH_ADD_CONTACT_FROM_APPOINT);
}

function startPickContactActivity() {
    var intent = new Intent();
    intent.putExtra(Common.PREVIOUS_ACTIVITY_ID,mCurrentId);
    intent.setClassName(Activity, "com.baidu.patient.activity.ContactsActivity");
    intent.putExtra(Common.CONTACT_FROM_PICK, true);
    CommonUtil.startActivityForResult(Activity, intent, Common.LAUNCH_PICK_CONTACT_FROM_APPOINT);
}

function initAppointAddListener() {
    mController.setAddAppointLisener(new AppointAddListener() {
        onResponseSucceed : function( reserveId) {
            //controlLoadingDialog(false);
            Toast.makeText(Activity,"appoint success:"+reserveId,1).show();

            if (reserveId <= 0 && BuildConfig.DEBUG) {
                throw new RuntimeException("submit appoint, Server Fatal Exception");
            } else {
                mSubmitSusseed = true;
                ShoppingCartWrapper.getInstance().clearShoppingCart();
                Utils.deleteFile(mImageCacheWrapper.getLocalImageList());
                ConfigManager.getInstance().setLongValue(ConfigManager.CONTACT_HISTORY_KEY, mContactId);
                ReportManager.getInstance().report(StatReport.STAT_APPOINT);
                var intent = new Intent();
                intent.putExtra(Common.PREVIOUS_ACTIVITY_ID,mCurrentId);
                DoctorSubmitActivity.launchSelf(Activity, reserveId, intent);
            }
        },
        onResponseFailed : function( statusCode,  object) {
            //controlLoadingDialog(false);
            Toast.makeText(Activity,"appoint error:"+object,1).show();

            Activity.runOnUiThread(new Runnable() {
                run: function() {
                    switch (statusCode) {
                        case 1:
                            if (object instanceof List) {
                                var modelList =  object;
                                if (modelList != null && !modelList.isEmpty()) {
                                    showDoctorErrorDialog(modelList);
                                } else {
                                    if (BuildConfig.DEBUG) {
                                        android.util.Log.d(TAG, "doctorAppointActivity() showErrorDialog() modelList is null, fatal Exception");
                                    }
                                }
                            } else {
                                if (BuildConfig.DEBUG) {
                                    android.util.Log.d(TAG, "Server Fatal Exception , error = " + object);
                                }
                            }
                            break;
                        case 2:
                            if (object instanceof String) {
                                var failedReason =  object;
                                showToast(failedReason);
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
        }
    });
}

function showToast( reason) {
    if (!TextUtils.isEmpty(reason) && reason.contains(",")) {
        var rea = reason.split(",");
        if (rea != null && rea.length > 1) {
            reason = rea[0] + "\n" + rea[1];
        }
    }
    ToastUtil.showToast(Activity, reason);
}

function showDoctorErrorDialog( modelList) {
    ReportManager.getInstance().report(MTJReport.EVENT_ID_APPOINT_DOCTOR_TIMES);

    var dialogListView = new DialogListView(Activity);
    dialogListView.setModelList(modelList);


    var builder = new CommonDialog.Builder(Activity).setPanel(dialogListView).setCancelable(true)
        .setCanceledOnTouchOutside(true)
        .setSingleButton(R.string.my_appoint_list_patient_repick_doctor, function() {
            dialog.dismiss();
            CommonUtil.backToDoctorList(Activity);
        }
    );

    if (!isFinishing()) {
        builder.show();
    }
}

function onActivityResult( requestCode,  resultCode,  data) {

    if (resultCode != Activity.RESULT_OK) {
        return;
    }
    switch (requestCode) {
        case 1:
            var cameraPath = PhotoPickUtil.getInstance().processPhotoToGetPath(Activity, null, PICK_PHOTO_FROM_GALLERY_CODE);
            updateUI(cameraPath);
            break;
        case 2:
            var bigImagePath = PhotoPickUtil.getInstance().processPhotoToGetPath(Activity, data, PICK_PHOTO_FROM_GALLERY_CODE);
            updateUI(bigImagePath);
            break;
        case 3:
            if (data == null) {
                return;
            }

            var deleteList = data.getParcelableArrayListExtra(Common.DELETE_IMAGE_LIST);


            if (deleteList.size() > 0) {
                mImageCacheWrapper.getImageInfoList().removeAll(deleteList);
                mAdapter.setImageInfoList(mImageCacheWrapper.getImageInfoList());
            }

            if (mImageCacheWrapper.getImageInfoList().size() == 1) {
                if (mPhotoTipsView.getVisibility() == View.GONE) {
                    mPhotoTipsView.setVisibility(View.VISIBLE);
                    mMaskView.setVisibility(View.VISIBLE);
                }

                if (mHorizontalListView.getVisibility() == View.VISIBLE) {
                    mHorizontalListView.setVisibility(View.GONE);
                    mMaskView.setVisibility(View.VISIBLE);
                }
            }
            break;
        case Common.LAUNCH_LOGIN_FROM_APPOINT:
            if (UserManager.getInstance().isUserLogin()) {
                uploadImageAndsubmitAppointment();
            }
            break;
        case Common.LAUNCH_ADD_CONTACT_FROM_APPOINT:
            updateContactUiPick(data, false);
            break;
        case Common.LAUNCH_PICK_CONTACT_FROM_APPOINT:
            updateContactUiPick(data, true);
            break;
        case Common.LAUNCH_LOGIN_FROM_ADD_CONTACT:
            if (UserManager.getInstance().isUserLogin()) {
                loadContactFromServer();
            }
            break;
        default:
            break;
    }
}

function updateContactUiPick( intent,  fromPick) {
    if (intent != null) {
        mContactId = intent.getLongExtra(Common.CONTACT_ID, 0);
        var name = intent.getStringExtra(Common.CONTACT_NAME);
        var phone = intent.getStringExtra(Common.CONTACT_PHONE);
        var identity = intent.getStringExtra(Common.CONTACT_IDENTITY);
        mContactNameTextView.setText(name);
        if (!StringUtils.isEmptyOrNull(phone)) {
            if (Activity.getString(R.string.contact_phone_empty).equals(phone.trim())) {
                mPhoneEditTextClear.setText("");
                mPhoneEditTextClear.setHint(R.string.appoint_doctor_patient_phone_hint);
            } else {
                mPhoneEditTextClear.setText(phone);
            }

            if (fromPick) {
                mSourcePhone = phone;
            }
        }

        var cache = ShoppingCartWrapper.getInstance();
        var id = UserManager.getInstance().isUserLogin() ? mContactId : -1;
        cache.setPatientWithContact(id, name, phone, identity);
        ConfigManager.getInstance().setLongValue(ConfigManager.CONTACT_HISTORY_KEY, id);

        var tmpContact = new Contacts();
        tmpContact.setId(mContactId);
        tmpContact.setName(name);
        tmpContact.mPhone = phone;
        tmpContact.setIdentification(identity);
        mContactList.add(tmpContact);

        updatePatientUI(fromPick);
    }
}

function updatePatientUI( showPhoneContainer) {
    if (mContactList.isEmpty()) {
        mPhoneContainer.setVisibility(View.GONE);
        mContactNameTextView.setVisibility(View.GONE);
        mContactNameTextViewRight.setVisibility(View.VISIBLE);
        mContactNameImageView.setImageResource(R.drawable.icon_go_blue);
    } else {
        mPhoneContainer.setVisibility(showPhoneContainer ? View.VISIBLE : View.GONE);
        mContactNameTextView.setVisibility(View.VISIBLE);
        mContactNameTextViewRight.setVisibility(View.GONE);
        mContactNameImageView.setImageResource(R.drawable.icon_go);
    }
}

function updateUI( path) {
    if (mPhotoTipsView.getVisibility() == View.VISIBLE) {
        mPhotoTipsView.setVisibility(View.GONE);
        mMaskView.setVisibility(View.GONE);
    }

    if (mHorizontalListView.getVisibility() == View.GONE) {
        mHorizontalListView.setVisibility(View.VISIBLE);
        mMaskView.setVisibility(View.GONE);
    }

    mImageCacheWrapper.addImageInfo(path, "");
    mAdapter.setImageInfoList(mImageCacheWrapper.getImageInfoList());

    mHorizontalListView.setSelection(mImageCacheWrapper.getImageInfoList().size());
}

function uploadImage() {
    var imageList = mImageCacheWrapper.getLocalImageList();
    if (imageList != null && !imageList.isEmpty()) {
        //controlLoadingDialog(true);
        ImageUploadController.getInstance().uploadImages(mPreId, mCurrentId, imageList);
    }
}

function initImageUploadListener() {
    ImageUploadController.getInstance().setOnUploadListener(new ImageUploadController.OnUploadListener() {
        onFailed : function( code,  reason) {
            submitAppoint();
        },
        onSuccess : function( code,  succeedList,  failList) {
            if (succeedList != null && !succeedList.isEmpty()) {
                mUpdateSucceedImageList.clear();
                if (!mImageCacheWrapper.getServerImageList().isEmpty()) {
                    mUpdateSucceedImageList.addAll(mImageCacheWrapper.getServerImageList());
                }
                mUpdateSucceedImageList.addAll(succeedList);
            }

            submitAppoint();
        }
    });
}

function onDestroy() {

    if (!mSubmitSusseed) {
        cacheAppointmentInfo();
    }
}

function cacheAppointmentInfo() {
    var cache = ShoppingCartWrapper.getInstance();
    cache.mCacheImageInfoList.clear();
    if (mDisplayDiseaseImage) {

        if (mImageCacheWrapper.getAllRealImageList().size() > 0) {
            cache.mCacheImageInfoList.addAll(mImageCacheWrapper.getAllRealImageList());
        }

        var desc = mDescriptionEditText.getText().toString().trim();
        if (!TextUtils.isEmpty(desc)) {
            cache.mPatient.mPatientDesc = desc;
        }
    }


    var visitCard = mVisitCardNumberEditText.getText().toString().trim();
    if (!TextUtils.isEmpty(visitCard)) {
        cache.mPatient.mPatientVisitCard = visitCard;
    }


    var phone = mPhoneEditTextClear.getText().toString().trim();
    if (!TextUtils.isEmpty(phone)) {
        cache.mPatient.mPatientPhone = phone;
    }
}

function initValidateParamsListener() {
    mController.setAppointAddValidateLisener(new AppointAddValidateListener() {
        onResponseSucceed : function() {
            LoginActivity.launchSelf(Activity, Common.LAUNCH_LOGIN_FROM_APPOINT);
        },
        onResponseFailed : function( statusCode,  failedReason) {
            if (StringUtils.isEmptyOrNull(failedReason)) {
                return;
            }

            ToastUtil.showToast(Activity, failedReason);
        }
    });
}

function validateParams() {
    mController.validateParamsBeforeLogin(mPreId, mCurrentId, buildPatient(), ModelUtil.getAppointmentInfo(),
        buildVisitCard(), mDisplayDiseaseImage, mNeedVisitCard);
}