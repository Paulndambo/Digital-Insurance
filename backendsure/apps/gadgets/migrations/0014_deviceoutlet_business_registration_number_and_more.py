from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("gadgets", "0013_insuredgadget_warranty_expiry_date_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="deviceoutlet",
            name="business_registration_number",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="deviceoutlet",
            name="tax_identification_number",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
