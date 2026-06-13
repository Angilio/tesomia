<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Liste des Attributions</title>

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
            border-bottom: 2px solid #2563eb;
            padding-bottom: 12px;
            margin-bottom: 20px;
        }

        .header h2 {
            margin: 0;
            font-size: 22px;
            color: #1e3a8a;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .header p {
            margin: 6px 0 0;
            font-size: 11px;
            color: #6b7280;
        }

        .info {
            margin-bottom: 12px;
            font-size: 11px;
            color: #374151;
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
            background-color: #1d4ed8;
            color: #ffffff;
            font-size: 11px;
            text-transform: uppercase;
            padding: 8px 6px;
            border: 1px solid #1e40af;
        }

        td {
            padding: 7px 6px;
            border: 1px solid #d1d5db;
            text-align: center;
            vertical-align: middle;
            word-wrap: break-word;
        }

        tbody tr:nth-child(even) {
            background-color: #f9fafb;
        }

        .text-left {
            text-align: left;
        }

        .badge {
            display: inline-block;
            padding: 3px 7px;
            border-radius: 12px;
            background-color: #dbeafe;
            color: #1e40af;
            font-size: 10px;
            font-weight: bold;
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
        <h2>Liste des Attributions</h2>
        <p>Document généré le {{ now()->format('d/m/Y à H:i') }}</p>
    </div>

    <div class="info">
        <strong>Total :</strong> {{ $attributions->count() }} attribution(s)
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 25%;">Utilisateur</th>
                <th style="width: 20%;">Rôle</th>
                <th style="width: 25%;">Logement</th>
                <th style="width: 15%;">Date début</th>
                <th style="width: 15%;">Date fin</th>
            </tr>
        </thead>

        <tbody>
            @forelse($attributions as $attr)
                <tr>
                    <td class="text-left">
                        {{ $attr->user->name ?? '-' }}
                    </td>

                    <td>
                        <span class="badge">
                            {{ $attr->user->roles->pluck('name')->join(', ') ?: '-' }}
                        </span>
                    </td>

                    <td class="text-left">
                        {{ $attr->logement->name ?? '-' }}
                    </td>

                    <td>
                        {{ $attr->date_debut ? \Carbon\Carbon::parse($attr->date_debut)->format('d/m/Y') : '-' }}
                    </td>

                    <td>
                        {{ $attr->date_fin ? \Carbon\Carbon::parse($attr->date_fin)->format('d/m/Y') : 'En cours' }}
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="empty">
                        Aucune attribution trouvée.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Gestion des attributions - PDF généré automatiquement
    </div>

</body>
</html>