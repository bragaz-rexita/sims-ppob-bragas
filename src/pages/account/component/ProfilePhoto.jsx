import { useState, useEffect } from "react";
import { Upload, Avatar, message } from "antd";
import { UploadOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import { updatePhotoProfile } from "../../../api/api-account";
import { NotifAlert } from "../../../components/Global/ToastNotif";

const ProfilePhotoUpload = ({ urlPhoto, onRefresh }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (urlPhoto) {
            setImageUrl(urlPhoto);
        }
    }, [urlPhoto]);

    const beforeUpload = async (file) => {
        const isImage = file.type?.startsWith("image/");
        if (!isImage) {
            message.error("Hanya file gambar yang diperbolehkan!");
            return Upload.LIST_IGNORE;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Ukuran gambar harus < 2MB!");
            return Upload.LIST_IGNORE;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await updatePhotoProfile(formData);
            if(response){
                NotifAlert({
                    icon: 'success',
                    title: 'Success',
                    message: response.message,
                });
            }
            const preview = URL.createObjectURL(file);
            setImageUrl(preview);

            if (onRefresh) {
                await onRefresh();
            }
        } catch (err) {
            console.error(err);
            message.error("Gagal upload foto");
        } finally {
            setLoading(false);
        }

        return false;
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
            }}
        >
            <Upload
                key={imageUrl || "empty"}
                showUploadList={false}
                beforeUpload={beforeUpload}
                accept="image/*"
            >
                <div
                    style={{
                        position: "relative",
                        width: 120,
                        height: 120,
                        cursor: "pointer",
                    }}
                >
                    <Avatar
                        size={120}
                        src={imageUrl}
                        icon={!imageUrl && <UserOutlined />}
                    />

                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            backgroundColor: "gray",
                            borderRadius: "50%",
                            width: 28,
                            height: 28,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            border: "2px solid #fff",
                        }}
                    >
                        <EditOutlined style={{ fontSize: 14 }} />
                    </div>

                    {loading && (
                        <div
                            style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: 12,
                            }}
                        >
                            Uploading...
                        </div>
                    )}
                </div>
            </Upload>
        </div>
    );
};

export default ProfilePhotoUpload;