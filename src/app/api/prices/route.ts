// اگر تایپ‌اسکریپت استفاده می‌کنی
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://brsapi.ir/Api/User.php?key='+process.env.API_KEY, {
    //   headers: {
    //     Authorization: 'Bearer YOUR_API_KEY', // اگه نیاز به کلید داره
    //   },
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'خطا در دریافت قیمت' }, { status: 500 });
  }
}
