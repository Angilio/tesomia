<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Rapport des Droits Annuels</title>

    <style>
        @page {
            margin: 25px 25px 45px 25px;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #111827;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid #16a34a;
            padding-bottom: 12px;
            margin-bottom: 18px;
        }

        .header h2 {
            margin: 0;
            font-size: 22px;
            color: #166534;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .header p {
            margin: 6px 0 0;
            font-size: 11px;
            color: #6b7280;
        }

        .summary {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 6px;
        }

        .summary strong {
            color: #166534;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        thead {
            display: table-header-group;
        }

        tr {
            page-break-inside: avoid;
        }

        th {
            background-color: #16a34a;
            color: #ffffff;
            padding: 8px 6px;
            border: 1px solid #15803d;
            text-transform: uppercase;
            font-size: 11px;
        }

        td {
            border: 1px solid #d1d5db;
            padding: 7px 6px;
            vertical-align: middle;
            word-wrap: break-word;
        }

        tbody tr:nth-child(even) {
            background-color: #f9fafb;
        }

        .text-center {
            text-align: center;
        }

        .paye {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            background-color: #dcfce7;
            color: #166534;
            font-weight: bold;
            font-size: 10px;
        }

        .non-paye {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            background-color: #fee2e2;
            color: #991b1b;
            font-weight: bold;
            font-size: 10px;
        }

        .empty {
            text-align: center;
            padding: 18px;
            color: #6b7280;
            font-style: italic;
        }

        .footer {
            position: fixed;
            bottom: -25px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 8px;
        }
    </style>
</head>

<body>

    <div class="header">
        <h2>Rapport des Droits Annuels</h2>
        <p>Document généré le {{ now()->format('d/m/Y à H:i') }}</p>
    </div>

    <div class="summary">
        <strong>Total des membres :</strong> {{ $totalMembres }}
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 35%;">Nom du membre</th>
                <th style="width: 45%;">Adresse</th>
                <th style="width: 20%;">Statut paiement</th>
            </tr>
        </thead>

        <tbody>
            @forelse($membres as $membre)
                <tr>
                    <td>{{ $membre['name'] ?? '-' }}</td>
                    <td>{{ $membre['adresse'] ?? '-' }}</td>
                    <td class="text-center">
                        @if($membre['paye'])
                            <span class="paye">Payé</span>
                        @else
                            <span class="non-paye">Non payé</span>
                        @endif
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="3" class="empty">
                        Aucun membre trouvé.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Rapport des droits annuels - PDF généré automatiquement
    </div>

</body>
</html>